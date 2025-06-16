"use client";
import { useState, useEffect } from "react";
import { getAllRecipes, addRecipe, updateRecipe, deleteRecipe } from "../../../../lib/database";

export default function DashboardRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", category: "", desc: "", image: "", ingredients: "", steps: "" });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;
  const totalPages = Math.ceil(recipes.length / rowsPerPage);
  const paginatedRecipes = recipes.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (e) {
      setError("Failed to load recipes");
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
    if (!isSlugUnique(slug)) {
      if (tryCount > 5) return `${baseSlug}-${Date.now()}`;
      return generateSlug(name, tryCount + 1);
    }
    return slug;
  };

  // Check if slug is unique
  const isSlugUnique = (slug) => {
    if (editId) {
      return !recipes.some((r) => r.slug === slug && r.id !== editId);
    }
    return !recipes.some((r) => r.slug === slug);
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
    try {
      const recipeToAdd = {
        ...form,
        ingredients: form.ingredients.split("\n").map((i) => i.trim()).filter(Boolean),
        steps: form.steps.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      await addRecipe(recipeToAdd);
      setForm({ name: "", slug: "", category: "", desc: "", image: "", ingredients: "", steps: "" });
      setShowForm(false);
      fetchRecipes();
    } catch {
      setError("Failed to add recipe");
    }
  };

  const handleEdit = (recipe) => {
    setEditId(recipe.id);
    setForm({
      name: recipe.name,
      slug: recipe.slug,
      category: recipe.category || "",
      desc: recipe.desc || "",
      image: recipe.image || "",
      ingredients: (recipe.ingredients || []).join("\n"),
      steps: (recipe.steps || []).join("\n"),
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
      const recipeToUpdate = {
        ...form,
        ingredients: form.ingredients.split("\n").map((i) => i.trim()).filter(Boolean),
        steps: form.steps.split("\n").map((s) => s.trim()).filter(Boolean),
      };
      await updateRecipe(editId, recipeToUpdate);
      setEditId(null);
      setForm({ name: "", slug: "", category: "", desc: "", image: "", ingredients: "", steps: "" });
      setShowForm(false);
      fetchRecipes();
    } catch {
      setError("Failed to update recipe");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recipe?")) return;
    try {
      await deleteRecipe(id);
      fetchRecipes();
    } catch {
      setError("Failed to delete recipe");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-400 mb-6">Recipes</h1>
      <button onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", slug: "", category: "", desc: "", image: "", ingredients: "", steps: "" }); }} className="mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">Add Recipe</button>
      {error && <div className="mb-4 text-red-400">{error}</div>}
      {showForm && (
        <form onSubmit={editId ? handleUpdate : handleAdd} className="mb-8 bg-[#231313] p-6 rounded-xl border border-orange-900">
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Name</label>
            <input name="name" value={form.name} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" required />
          </div>
          {/* Slug is auto-generated and not shown as an input */}
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Slug</label>
            <div className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900 text-orange-300 select-all cursor-default">
              {form.slug}
            </div>
            {!isSlugUnique(form.slug) && <div className="text-red-400 text-sm mt-1">Slug must be unique.</div>}
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Category</label>
            <input name="category" value={form.category} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" required />
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
            <label className="block mb-1 font-semibold">Ingredients (one per line)</label>
            <textarea name="ingredients" value={form.ingredients} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" rows={4} required />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-semibold">Steps (one per line)</label>
            <textarea name="steps" value={form.steps} onChange={handleInput} className="w-full px-3 py-2 rounded bg-[#181111] border border-orange-900" rows={4} required />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">{editId ? "Update" : "Add"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold">Cancel</button>
          </div>
        </form>
      )}
      {loading ? (
        <div className="text-orange-300 animate-pulse">Loading...</div>
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
              <th className="p-2">Ingredients</th>
              <th className="p-2">Steps</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecipes.map((r) => (
              <tr key={r.id} className="text-orange-200 border-t border-orange-900">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.slug}</td>
                <td className="p-2">{r.category}</td>
                <td className="p-2 max-w-xs truncate" title={r.desc}>{r.desc}</td>
                <td className="p-2">{r.image && <img src={r.image} alt={r.name} className="w-16 h-12 object-cover rounded" />}</td>
                <td className="p-2 max-w-xs truncate" title={(r.ingredients || []).join(", ")}>{(r.ingredients || []).slice(0,2).join(", ")}{(r.ingredients && r.ingredients.length > 2) ? '...' : ''}</td>
                <td className="p-2 max-w-xs truncate" title={(r.steps || []).join(" | ")}>{(r.steps || []).slice(0,1).join(" | ")}{(r.steps && r.steps.length > 1) ? '...' : ''}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handleEdit(r)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(r.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
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
