'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductsByCategorySlug, getAllCategories } from "../../../../../lib/database";
import Link from "next/link";
import Image from "next/image";

export default function ProductsByCategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const cats = await getAllCategories();
      const cat = cats.find((c) => c.slug === slug);
      setCategory(cat);
      if (cat) {
        const prods = await getProductsByCategorySlug(cat.slug);
        setProducts(prods);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#181111] text-[#fff8f0] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          {category ? category.name : "Category"} Products
        </h1>
        {loading ? (
          <div className="text-center text-orange-200">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-orange-200">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <Link
                key={prod.id}
                href={`/products/${prod.slug}`}
                className="bg-[#231313] rounded-lg shadow-lg p-4 border border-[#2d1616] flex flex-col items-center hover:bg-[#2d1616] transition"
              >
                {prod.image && (
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    width={520}
                    height={520}
                    className="rounded mb-2 object-cover w-[220px] h-[200px] border-2 border-orange-800 shadow-lg"
                  />
                )}
                {/* <div className="font-bold text-lg text-orange-300 mb-1">{prod.name}</div>
                <div className="text-orange-200 mb-2">{prod.price ? `Rs. ${prod.price}` : "-"}</div>
                <div className="text-orange-100 text-sm text-center">{prod.desc}</div> */}
                <h2 className="text-xl font-extrabold text-orange-300 mb-2 text-center drop-shadow">{prod.name}</h2>
                <p className="text-orange-200 text-center text-sm mb-4 italic">
                  {prod.desc && prod.desc.length > 10 ? prod.desc.slice(0, 100) + "..." : prod.desc}
                </p>
                {prod.price && (
                  <div className="text-orange-400 font-bold mb-2">Price: Rs. {prod.price}</div>
                )}
                <div className="text-orange-400 text-xs mb-4">Category: {prod.category}</div>
                <Link href={`/products/${prod.slug}`} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full shadow-lg transition mt-auto text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-orange-400">View Details</Link>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
