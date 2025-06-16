'use client';
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../lib/database";
import { register } from "../../../../lib/auth";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [authUsers, setAuthUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchAuthUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      setUsers([]);
    }
    setLoading(false);
  }

  async function fetchAuthUsers() {
    try {
      const res = await fetch("/api/auth-users");
      const data = await res.json();
      setAuthUsers(data.users || []);
    } catch {
      setAuthUsers([]);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!form.email || !form.password || !form.confirm) {
      setStatus("Please fill all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setStatus("Passwords do not match.");
      return;
    }
    setRegistering(true);
    try {
      await register(form.email, form.password);
      setStatus("User registered successfully!");
      setForm({ email: "", password: "", confirm: "" });
      fetchUsers();
      fetchAuthUsers();
    } catch (err) {
      setStatus(err.message || "Failed to register user.");
    }
    setRegistering(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-orange-400 mb-6 text-center">Admin Users</h1>
      <form onSubmit={handleRegister} className="flex flex-wrap gap-2 mb-6 justify-center items-end">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-[#181111] border border-orange-700 text-white"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-[#181111] border border-orange-700 text-white"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="p-2 rounded bg-[#181111] border border-orange-700 text-white"
          value={form.confirm}
          onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
          required
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition"
          disabled={registering}
        >
          {registering ? "Registering..." : "Register User"}
        </button>
      </form>
      {status && <div className="text-center text-orange-300 mb-4">{status}</div>}

      <h2 className="text-xl font-bold text-orange-300 mb-2 mt-8 text-center">Registered Auth Users</h2>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#2d1616] text-orange-300">
              <th className="px-4 py-2">UID</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Display Name</th>
              <th className="px-4 py-2">Disabled</th>
            </tr>
          </thead>
          <tbody>
            {authUsers.map((user) => (
              <tr key={user.uid} className="border-b border-[#2d1616]">
                <td className="px-4 py-2">{user.uid}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.displayName || "-"}</td>
                <td className="px-4 py-2">{user.disabled ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-orange-300 mb-2 text-center">Firestore Users</h2>
      {loading ? (
        <div className="text-center text-orange-200">Loading...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-orange-200">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[#2d1616] text-orange-300">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#2d1616]">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded opacity-50 cursor-not-allowed"
                      disabled
                      title="User deletion requires admin privileges"
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
