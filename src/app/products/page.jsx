'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "../../../lib/database";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch("/products.json")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProducts(data);
    //     setLoading(false);
    //   });
    const loaddata = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    loaddata().catch((error) => {
      console.error("Error loading products:", error);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231313] via-[#181111] to-[#2d1616] text-[#fff8f0] px-4 py-12">
      <h1 className="text-4xl font-extrabold text-orange-400 mb-10 text-center drop-shadow">All Products</h1>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="animate-pulse text-orange-300 text-lg">Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <span className="text-orange-300 text-lg">No products found.</span>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-[#231313] rounded-2xl shadow-2xl p-6 flex flex-col items-center border-2 border-orange-900 hover:scale-105 hover:shadow-orange-900 transition-transform duration-200">
              <Image src={product.image} alt={product.name} width={520}
                height={520}
                className="rounded mb-2 object-cover w-[220px] h-[200px] border-2 border-orange-800 shadow-lg" />
              <h2 className="text-xl font-extrabold text-orange-300 mb-2 text-center drop-shadow">{product.name}</h2>
              <p className="text-orange-200 text-center text-sm mb-4 italic">
                {product.desc && product.desc.length > 10 ? product.desc.slice(0, 100) + "..." : product.desc}
              </p>
              {product.price && (
                <div className="text-orange-400 font-bold mb-2">Price: Rs. {product.price}</div>
              )}
              <div className="text-orange-400 text-xs mb-4">Category: {product.category}</div>
              <Link href={`/products/${product.slug}`} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transition mt-auto text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-orange-400">View Details</Link>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-12">
        <Link href="/" className="bg-[#181111] border border-orange-700 text-orange-300 hover:bg-orange-700 hover:text-white font-semibold py-2 px-8 rounded-full shadow transition focus:outline-none focus:ring-2 focus:ring-orange-400">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
