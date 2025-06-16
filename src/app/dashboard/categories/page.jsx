'use client';
import { useEffect, useState } from "react";
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../../lib/database";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "" });
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch {
      setCategories([]);
    }
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      if (editing) {
        await updateCategory(editing, { name: form.name });
        setStatus("Category updated!");
      } else {
        await addCategory({ name: form.name });
        setStatus("Category added!");
      }
      setForm({ name: "" });
      setEditing(null);
      fetchCategories();
    } catch (err) {
      setStatus(err.message || "Failed to save category.");
    }
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name });
    setEditing(cat.id);
    setStatus("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    setStatus("");
    try {
      await deleteCategory(id);
      setStatus("Category deleted!");
      fetchCategories();
    } catch {
      setStatus("Failed to delete category.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-400 mb-6 text-center">Categories</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6 justify-center">
        <input
          type="text"
          placeholder="Category Name"
          className="p-2 rounded bg-[#181111] border border-orange-700 text-white"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
        >
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
            onClick={() => {
              setEditing(null);
              setForm({ name: "" });
              setStatus("");
            }}
          >
            Cancel
          </button>
        )}
      </form>
      {status && <div className="text-center text-orange-300 mb-4">{status}</div>}
      {loading ? (
        <div className="text-center text-orange-200">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="text-center text-orange-200">No categories found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#2d1616] text-orange-300">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-[#2d1616]">
                  <td className="px-4 py-2">{cat.name}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      onClick={() => handleDelete(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
//                       onClick={() => handleDelete(cat.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
