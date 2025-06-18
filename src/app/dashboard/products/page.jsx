"use client";
import { useState, useEffect } from "react";
import { getAllProducts, addProduct, updateProduct, deleteProduct, getAllCategories, getProductsByCategorySlug } from "../../../../lib/database";

const initialForm = {
  name: "",
  price: "",
  slug: "",
  categorySlug: "",
  desc: "",
  image: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  inStock: true,
  unit: "g",
  discountQty: "",
  discountAmount: "",
  quantity: "", // add quantity field
};

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(products.length / rowsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const cats = await getAllCategories();
      setCategories(cats);
      setError("");
    } catch (e) {
      setError("Failed to load categories");
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedCategory === "all") {
        data = await getAllProducts();
      } else {
        data = await getProductsByCategorySlug(selectedCategory);
      }
      setProducts(data);
      setError("");
    } catch (e) {
      setError("Failed to load products");
      setProducts([]);
    }
    setLoading(false);
  };

  // Utility to generate slug from name and ensure uniqueness
  const generateSlug = (name) => {
    let baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    let slug = baseSlug;
    let count = 1;
    // Check uniqueness among current products
    while (
      products.some(
        (p) => p.slug === slug && (!editId || p.id !== editId)
      )
    ) {
      slug = `${baseSlug}-${count++}`;
    }
    return slug;
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "name") {
      const newSlug = generateSlug(value);
      setForm(f => ({
        ...f,
        name: value,
        slug: newSlug,
      }));
    } else if (name === "inStock") {
      setForm(f => ({
        ...f,
        inStock: !!checked,
      }));
    } else {
      setForm(f => ({
        ...f,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    setStatus("");
    setError("");
    if (!form.image) {
      setError("Main image is required.");
      setAdding(false);
      return;
    }
    try {
      const productData = {
        ...form,
        price: Number(form.price),
        discountQty: form.discountQty ? Number(form.discountQty) : undefined,
        discountAmount: form.discountAmount ? Number(form.discountAmount) : undefined,
        inStock: !!form.inStock,
        quantity: form.quantity !== "" ? Number(form.quantity) : undefined,
      };
      await addProduct(productData);
      setStatus("Product added!");
      setForm(initialForm);
      setShowForm(false);
      if (selectedCategory === "all" || selectedCategory === form.categorySlug) {
        const prods = selectedCategory === "all"
          ? await getAllProducts()
          : await getProductsByCategorySlug(selectedCategory);
        setProducts(prods);
      }
    } catch (err) {
      setStatus("");
      setError(err.message || "Failed to add product.");
    }
    setAdding(false);
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      slug: product.slug,
      categorySlug: product.categorySlug || "",
      desc: product.desc || "",
      image: product.image || "",
      image1: product.image1 || "",
      image2: product.image2 || "",
      image3: product.image3 || "",
      image4: product.image4 || "",
      inStock: typeof product.inStock === "boolean" ? product.inStock : true,
      unit: product.unit || "g",
      discountQty: product.discountQty || "",
      discountAmount: product.discountAmount || "",
      quantity: typeof product.quantity === "number" ? product.quantity : "",
    });
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const updateData = {
        ...form,
        price: Number(form.price),
        discountQty: form.discountQty ? Number(form.discountQty) : undefined,
        discountAmount: form.discountAmount ? Number(form.discountAmount) : undefined,
        inStock: !!form.inStock,
        quantity: form.quantity !== "" ? Number(form.quantity) : undefined,
      };
      await updateProduct(editId, updateData);
      setEditId(null);
      setForm(initialForm);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.message || "Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    setError("");
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-400 mb-6">Products</h1>
      <button onClick={() => { setShowForm(true); setEditId(null); setForm(initialForm); }} className="mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">Add Product</button>
      {error && <div className="mb-4 text-red-400">{error}</div>}
      {showForm && (
        <form onSubmit={editId ? handleUpdate : handleAdd} className="mb-8 bg-[#231313] p-6 rounded-xl border border-orange-900">
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Slug</label>
            <div className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900 text-orange-300 select-all cursor-default">
              {form.slug}
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="categorySlug"
              value={form.categorySlug}
              onChange={handleInput}
              className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Description</label>
            <textarea name="desc" value={form.desc} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Stock</label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="inStock"
                checked={form.inStock}
                onChange={handleInput}
                className="accent-orange-500"
              />
              <span>{form.inStock ? "In Stock" : "Out of Stock"}</span>
            </label>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Main Image URL <span className="text-red-500">*</span></label>
            <input name="image" value={form.image} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" required />
            {form.image && (
              <div className="mt-2">
                <img src={form.image} alt="Preview" className="w-24 h-20 object-cover rounded border border-orange-700" />
              </div>
            )}
          </div>
          <div className="mb-2 grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 font-semibold">Image 1 URL</label>
              <input name="image1" value={form.image1} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Image 2 URL</label>
              <input name="image2" value={form.image2} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Image 3 URL</label>
              <input name="image3" value={form.image3} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Image 4 URL</label>
              <input name="image4" value={form.image4} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" />
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleInput}
              className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900"
              required
            >
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="g">g</option>
              <option value="kg">kg</option>
            </select>
          </div>
          <div className="mb-2 flex gap-2">
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Discount Quantity</label>
              <input
                type="number"
                name="discountQty"
                value={form.discountQty}
                onChange={handleInput}
                className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900"
                min="1"
                placeholder="e.g. 5"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold">Discount Amount</label>
              <input
                type="number"
                name="discountAmount"
                value={form.discountAmount}
                onChange={handleInput}
                className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900"
                min="0"
                placeholder="e.g. 100"
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleInput}
              className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900"
              min="0"
              placeholder="e.g. 100"
            />
          </div>
            <div className="mb-2">
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInput}
              className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900"
              min="0"
              placeholder="Rs. 100"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">{editId ? "Update" : "Add"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold">Cancel</button>
          </div>
        </form>
      )}
      <div className="mb-4 flex gap-2 items-center">
        <label className="text-orange-200 font-semibold">Filter by Category:</label>
        <select
          className="p-2 rounded bg-[#181111] border border-orange-700 text-white"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-orange-300 animate-pulse">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-orange-200">No products found.</div>
      ) : (
        <>
        <table className="w-full bg-[#231313] rounded-xl border border-orange-900">
          <thead>
            <tr className="text-orange-400">
              <th className="p-2">Name</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Category</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Discount</th>
              <th className="p-2">Description</th>
              <th className="p-2">Image</th>
              <th className="p-2">Price</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <tr
                key={p.id}
                className="text-orange-200 border-t border-orange-900 cursor-pointer hover:bg-[#332020]"
                onClick={() => setSelectedProduct(p)}
              >
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.slug}</td>
                <td className="p-2">
                  {categories.find(cat => cat.slug === p.categorySlug)?.name || p.categorySlug}
                </td>
                <td className="p-2">{p.inStock ? "In" : "Out"}</td>
                <td className="p-2">{p.unit}</td>
                <td className="p-2">
                  {p.discountQty && p.discountAmount
                    ? `Buy ${p.discountQty}+ get Rs.${p.discountAmount} off`
                    : "-"}
                </td>
                <td className="p-2 max-w-xs truncate" title={p.desc}>{p.desc}</td>
                <td className="p-2">
                  {p.image && <img src={p.image} alt={p.name} className="w-16 h-12 object-cover rounded" />}
                </td>
                <td className="p-2">{p.price}</td>
                <td className="p-2">{typeof p.quantity === "number" ? p.quantity : "-"}</td>
                <td className="p-2 flex gap-2" onClick={e => e.stopPropagation()}>
                  <button onClick={() => handleEdit(p)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-orange-500 text-white font-bold disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-orange-200 font-semibold">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-orange-500 text-white font-bold disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        </>
      )}

      {/* Product Details Popup */
      selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#231313] rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-lg mx-2 border border-[#2d1616] relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-orange-400 text-xl font-bold"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-orange-400">Product Details</h2>
            <div className="mb-2"><span className="font-semibold">Name:</span> {selectedProduct.name}</div>
            <div className="mb-2"><span className="font-semibold">Slug:</span> {selectedProduct.slug}</div>
            <div className="mb-2"><span className="font-semibold">Category:</span> {categories.find(cat => cat.slug === selectedProduct.categorySlug)?.name || selectedProduct.categorySlug}</div>
            <div className="mb-2"><span className="font-semibold">Stock:</span> {selectedProduct.inStock ? "In Stock" : "Out of Stock"}</div>
            <div className="mb-2"><span className="font-semibold">Unit:</span> {selectedProduct.unit}</div>
            <div className="mb-2"><span className="font-semibold">Quantity:</span> {typeof selectedProduct.quantity === "number" ? selectedProduct.quantity : "-"}</div>
            <div className="mb-2"><span className="font-semibold">Discount:</span> {selectedProduct.discountQty && selectedProduct.discountAmount ? `Buy ${selectedProduct.discountQty}+ get Rs.${selectedProduct.discountAmount} off` : "-"}</div>
            <div className="mb-2"><span className="font-semibold">Description:</span> {selectedProduct.desc}</div>
            <div className="mb-2"><span className="font-semibold">Main Image:</span> {selectedProduct.image && <img src={selectedProduct.image} alt={selectedProduct.name} className="w-24 h-20 object-cover rounded inline-block" />}</div>
            {[1,2,3,4].map(i => (
              selectedProduct[`image${i}`] && (
                <div className="mb-2" key={i}>
                  <span className="font-semibold">{`Image ${i}:`}</span>{" "}
                  <img src={selectedProduct[`image${i}`]} alt={`Image ${i}`} className="w-24 h-20 object-cover rounded inline-block" />
                </div>
              )
            ))}
            <div className="mb-2"><span className="font-semibold">Price:</span> {selectedProduct.price}</div>
          </div>
        </div>
      )}
    </div>
  );
}
