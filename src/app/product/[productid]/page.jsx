'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage() {
  const { productid } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productid) return;
    fetch("/products.json")
      .then((res) => res.json())
      .then((products) => {
        const found = products.find((p) => p.slug === productid);
        setProduct(found);
      });
  }, [productid]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181111] text-[#fff8f0]">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#231313] via-[#181111] to-[#2d1616] text-[#fff8f0] px-4 py-12">
      <div className="max-w-2xl w-full bg-[#231313] rounded-2xl shadow-2xl p-8 border border-[#d7263d] flex flex-col items-center relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 rounded-full p-2 shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-orange-800"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2 mt-16 text-center drop-shadow">
          {product.name}
        </h1>
        <p className="text-orange-200 text-center mb-4 italic">
          {product.desc}
        </p>
        {product.details && (
          <div className="text-orange-100 text-center mb-4 text-sm bg-[#181111] rounded p-3 border border-orange-900">
            {product.details}
          </div>
        )}
        <div className="mb-6 text-orange-300 font-semibold">
          Category: {product.category}
        </div>
        {product.tags && (
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {product.price && (
          <div className="mb-4 text-lg font-bold text-orange-400">
            Price: Rs. {product.price}
          </div>
        )}
        {/* <button
          className="button-accent px-6 py-2 rounded font-bold text-lg mt-2 hover:bg-[#d7263d] transition mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white"
          onClick={() => router.push(`/buy/${product.slug}`)}
        >
          Buy Now
        </button> */}
        <Link
          href={`/checkout/${product.slug}`}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow transition mb-4"
        >
          Go to Checkout Page
        </Link>
        <Link
          href="/products"
          className="mt-8 bg-[#181111] border border-orange-700 text-orange-300 hover:bg-orange-700 hover:text-white font-semibold py-2 px-8 rounded-full shadow transition"
        >
          ← Back to All Products
        </Link>
      </div>
    </div>
  );
}
