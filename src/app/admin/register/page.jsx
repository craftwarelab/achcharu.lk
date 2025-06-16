"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    // Simulate registration
    alert("Registered (demo)");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#181111] text-[#fff8f0] font-sans">
      <form onSubmit={handleSubmit} className="bg-[#231313] p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-900 animate-fadeIn">
        <h1 className="text-2xl font-bold text-orange-400 mb-6 text-center">Admin Register</h1>
        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        <label className="block mb-2 font-semibold">Email</label>
        <input type="email" className="w-full mb-4 px-4 py-2 rounded bg-[#181111] border border-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400" value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="block mb-2 font-semibold">Password</label>
        <input type="password" className="w-full mb-4 px-4 py-2 rounded bg-[#181111] border border-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400" value={password} onChange={e => setPassword(e.target.value)} required />
        <label className="block mb-2 font-semibold">Confirm Password</label>
        <input type="password" className="w-full mb-6 px-4 py-2 rounded bg-[#181111] border border-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-400" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition">Register</button>
        <div className="mt-4 text-center text-orange-200">
          Already have an account? <Link href="/admin/login" className="text-orange-400 hover:underline">Login</Link>
        </div>
      </form>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1); }
      `}</style>
    </main>
  );
}
