"use client";
import { useState, useEffect } from "react";
import { getAllProducts, addProduct, updateProduct, deleteProduct, getAllCategories, getProductsByCategoryId } from "../../../../lib/database";

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", slug: "", categoryId: "", desc: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("");
  const rowsPerPage = 12;
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
    } catch (e) {
      setError("Failed to load categories");
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedCategory === "all") {
        data = await getAllProducts();
      } else {
        data = await getProductsByCategoryId(selectedCategory);
      }
      setProducts(data);
    } catch (e) {
      setError("Failed to load products");
    }
    setLoading(false);
  };

  // Utility to generate slug from name
  const generateSlug = (name, tryCount = 0) => {
    let baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    let slug = baseSlug;
    if (tryCount > 0) {
      slug = `${baseSlug}-${Math.floor(Math.random() * 10000)}`;
    }
    // Ensure uniqueness
    if (!isSlugUnique(slug)) {
      if (tryCount > 5) return `${baseSlug}-${Date.now()}`; // fallback
      return generateSlug(name, tryCount + 1);
    }
    return slug;
  };

  // Check if slug is unique
  const isSlugUnique = (slug) => {
    if (editId) {
      // Editing: allow the same slug for the current product
      return !products.some((p) => p.slug === slug && p.id !== editId);
    }
    return !products.some((p) => p.slug === slug);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    let newForm = { ...form, [name]: value };
    if (name === "name") {
      newForm.slug = generateSlug(value);
    }
    setForm(newForm);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!isSlugUnique(form.slug)) {
      setError("Slug must be unique.");
      return;
    }
    setAdding(true);
    setStatus("");
    try {
      await addProduct({
        name: form.name,
        price: Number(form.price),
        slug: form.slug,
        categoryId: form.categoryId,
        desc: form.desc,
        image: form.image,
      });
      setStatus("Product added!");
      setForm({ name: "", price: "", slug: "", categoryId: "", desc: "", image: "" });
      setShowForm(false);
      // reload products
      if (selectedCategory === "all" || selectedCategory === form.categoryId) {
        const prods = selectedCategory === "all"
          ? await getAllProducts()
          : await getProductsByCategoryId(selectedCategory);
        setProducts(prods);
      }
    } catch {
      setStatus("Failed to add product.");
    }
    setAdding(false);
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      slug: product.slug,
      categoryId: product.categoryId || "",
      desc: product.desc || "",
      image: product.image || ""
    });
    setShowForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!isSlugUnique(form.slug)) {
      setError("Slug must be unique.");
      return;
    }
    try {
      await updateProduct(editId, {
        name: form.name,
        price: Number(form.price),
        slug: form.slug,
        categoryId: form.categoryId,
        desc: form.desc,
        image: form.image,
      });
      setEditId(null);
      setForm({ name: "", price: "", slug: "", categoryId: "", desc: "", image: "" });
      setShowForm(false);
      fetchProducts();
    } catch {
      setError("Failed to update product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch {
      setError("Failed to delete product");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-400 mb-6">Products</h1>
      <button onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", price: "", slug: "", categoryId: "", desc: "", image: "" }); }} className="mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">Add Product</button>
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
            {!isSlugUnique(form.slug) && <div className="text-red-400 text-sm mt-1">Slug must be unique.</div>}
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleInput}
              className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
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
            <label className="block mb-1 font-semibold">Image URL</label>
            <input name="image" value={form.image} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" required />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Price</label>
            <input name="price" value={form.price} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" required />
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
            <option key={cat.id} value={cat.id}>
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
              <th className="p-2">Description</th>
              <th className="p-2">Image</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((p) => (
              <tr key={p.id} className="text-orange-200 border-t border-orange-900">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.slug}</td>
                <td className="p-2">
                  {categories.find(cat => cat.id === p.categoryId)?.name || p.categoryId}
                </td>
                <td className="p-2 max-w-xs truncate" title={p.desc}>{p.desc}</td>
                <td className="p-2">
                  {p.image && <img src={p.image} alt={p.name} className="w-16 h-12 object-cover rounded" />}
                </td>
                <td className="p-2">{p.price}</td>
                <td className="p-2 flex gap-2">
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
    </div>
  );
}
