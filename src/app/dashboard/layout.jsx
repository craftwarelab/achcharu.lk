"use client";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
        router.replace("/auth/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181111] text-[#fff8f0]">
        <span>Checking authentication...</span>
      </div>
    );
  }

  if (!authed) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[#181111] text-[#fff8f0] font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8 bg-[#231313] rounded-l-3xl shadow-xl m-4 w-6xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
