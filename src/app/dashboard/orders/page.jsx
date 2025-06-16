'use client';
import { useEffect, useState } from "react";
import { getAllOrders } from "../../../../lib/database";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

const ROWS_PER_PAGE = 12;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        setOrders([]);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selected) {
      setStatus(selected.status || "");
    }
  }, [selected]);

  // Filter orders by status, phone, and user name
  const filteredOrders = orders.filter((o) => {
    const statusMatch =
      filterStatus === "all" ? true : (o.status || "Pending") === filterStatus;
    const searchLower = search.trim().toLowerCase();
    const nameMatch = o.customerName?.toLowerCase().includes(searchLower);
    const phoneMatch = o.customerPhone?.toLowerCase().includes(searchLower);
    const searchMatch = !searchLower || nameMatch || phoneMatch;
    return statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredOrders.length / ROWS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const handleStatusUpdate = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const orderRef = doc(db, "orders", selected.id);
      await updateDoc(orderRef, { status });
      setOrders((prev) =>
        prev.map((o) => (o.id === selected.id ? { ...o, status } : o))
      );
      setSelected(null);
    } catch (err) {
      alert("Failed to update status.");
    }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-400 mb-2 text-center">Order Details</h1>
      {/* Total Orders, Filter, and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="text-orange-200 font-semibold">
          Total Orders: {filteredOrders.length}
        </div>
        <div className="flex gap-2 items-center">
          <label className="mr-2 text-orange-200">Filter by Status:</label>
          <select
            className="p-2 rounded bg-[#181111] border border-orange-700 text-white"
            value={filterStatus}
            onChange={e => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            className="p-2 rounded bg-[#181111] border border-orange-700 text-white ml-4"
            placeholder="Search by name or phone"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center text-orange-200">Loading...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center text-orange-200">No orders found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#2d1616] text-orange-300">
                  <th className="px-4 py-2">Product</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Quantity</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#2d1616] cursor-pointer hover:bg-[#332020]"
                    onClick={() => setSelected(order)}
                  >
                    <td className="px-4 py-2">{order.productName}</td>
                    <td className="px-4 py-2">{order.customerName}</td>
                    <td className="px-4 py-2">{order.customerPhone}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">{order.price ? `Rs. ${order.price * order.quantity}` : "-"}</td>
                    <td className="px-4 py-2">{order.dateString || (order.timestamp && order.timestamp.toDate && order.timestamp.toDate().toLocaleString())}</td>
                    <td className="px-4 py-2">{order.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-[#2d1616] text-orange-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="text-orange-300">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1 rounded bg-[#2d1616] text-orange-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      
      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#231313] rounded-lg shadow-lg p-8 max-w-md w-full border border-[#2d1616] relative">
            <button
              className="absolute top-2 right-2 text-orange-400 text-xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-orange-400">Order Details</h2>
            <div className="mb-2"><span className="font-semibold">Product:</span> {selected.productName}</div>
            <div className="mb-2"><span className="font-semibold">Product Slug:</span> {selected.productSlug}</div>
            <div className="mb-2"><span className="font-semibold">Customer Name:</span> {selected.customerName}</div>
            <div className="mb-2"><span className="font-semibold">Phone:</span> {selected.customerPhone}</div>
            <div className="mb-2"><span className="font-semibold">Address:</span> {selected.customerAddress}</div>
            <div className="mb-2"><span className="font-semibold">Quantity:</span> {selected.quantity}</div>
            <div className="mb-2"><span className="font-semibold">Price:</span> {selected.price ? `Rs. ${selected.price}` : "-"}</div>
            <div className="mb-2"><span className="font-semibold">Total:</span> {selected.price ? `Rs. ${selected.price * selected.quantity}` : "-"}</div>
            <div className="mb-2"><span className="font-semibold">Date:</span> {selected.dateString || (selected.timestamp && selected.timestamp.toDate && selected.timestamp.toDate().toLocaleString())}</div>
            {/* View Product Button */}
            {selected.productSlug && (
              <div className="mt-4 flex justify-center">
                <a
                  href={`/products/${selected.productSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
                >
                  View Product
                </a>
              </div>
            )}
            {/* Order Status Update */}
            <div className="mt-6">
              <label className="block mb-2 text-orange-200 font-semibold">Order Status</label>
              <select
                className="w-full p-2 rounded bg-[#181111] border border-orange-700 text-white"
                value={status}
                onChange={e => setStatus(e.target.value)}
                disabled={saving}
              >
                <option value="">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition w-full"
                onClick={handleStatusUpdate}
                disabled={saving}
                type="button"
              >
                {saving ? "Saving..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
