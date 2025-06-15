"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CategoryPage() {
  const { name } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/catogory.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
      })
      .then((data) => {
        const found = data.find(
          (cat) => cat.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
        );
        setCategory(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  return (
    <main className="min-h-screen bg-[#181111] text-[#fff8f0] px-4 py-12 font-sans" aria-label="Category Page">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-block mb-8 text-orange-400 hover:text-orange-200 font-semibold focus:underline">← Back to Home</Link>
        {loading ? (
          <div className="text-center text-orange-300 animate-pulse" role="status">Loading category...</div>
        ) : error ? (
          <div className="text-center text-red-400" role="alert">{error}</div>
        ) : !category ? (
          <div className="text-center text-orange-200">Category not found.</div>
        ) : (
          <section className="bg-[#231313] rounded-2xl shadow-xl p-8 border border-[#2d1616] animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
              <Image src={category.image} alt={category.name} width={120} height={120} className="rounded-full border-4 border-orange-800 bg-[#181111]" />
              <div>
                <h1 className="text-3xl font-extrabold text-orange-400 mb-2 drop-shadow-lg">{category.name}</h1>
                <p className="text-orange-200 text-lg">Explore all our spicy {category.name} items below!</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {category.items.map((item, idx) => (
                <li key={idx} className="bg-[#181111] rounded-xl p-4 border border-orange-900 shadow group hover:scale-105 transition-transform">
                  <span className="text-orange-300 font-semibold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
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
