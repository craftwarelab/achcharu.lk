'use client';
import { useEffect, useState } from "react";
import { getAllContacts } from "../../../../lib/database";

const ROWS_PER_PAGE = 12;

export default function DashboardContactDetails() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const data = await getAllContacts();
        setContacts(data);
      } catch (error) {
        setContacts([]);
      }
      setLoading(false);
    }
    fetchContacts();
  }, []);

  const totalPages = Math.ceil(contacts.length / ROWS_PER_PAGE);
  const paginatedContacts = contacts.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-400 mb-6 text-center">Contact Form Submissions</h1>
      {loading ? (
        <div className="text-center text-orange-200">Loading...</div>
      ) : contacts.length === 0 ? (
        <div className="text-center text-orange-200">No contact messages found.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#2d1616] text-orange-300">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Message</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#2d1616] cursor-pointer hover:bg-[#332020]"
                    onClick={() => setSelected(c)}
                  >
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.message}</td>
                    <td className="px-4 py-2">{c.dateString || (c.timestamp && c.timestamp.toDate && c.timestamp.toDate().toLocaleString())}</td>
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
            <h2 className="text-xl font-bold mb-4 text-orange-400">Contact Details</h2>
            <div className="mb-2"><span className="font-semibold">Name:</span> {selected.name}</div>
            <div className="mb-2"><span className="font-semibold">Email:</span> {selected.email}</div>
            <div className="mb-2"><span className="font-semibold">Message:</span> {selected.message}</div>
            <div className="mb-2"><span className="font-semibold">Date:</span> {selected.dateString || (selected.timestamp && selected.timestamp.toDate && selected.timestamp.toDate().toLocaleString())}</div>
            {/* Add more fields here if needed */}
          </div>
        </div>
      )}
    </div>
  );
}
