'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "../../../../lib/database";

export default function ProductPage() {
  const { productid } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    if (!productid) return;
    const loadData = async () => {
      const data = await getProductBySlug(productid);
      if (data) {
        setProduct(data);
        setMainImg(data.image);
      }
    }
    loadData().catch((error) => {
      console.error("Error loading product:", error);
    });
  }, [productid]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181111] text-[#fff8f0]">
        <span>Loading...</span>
      </div>
    );
  }

  const images = [product.image, product.image1, product.image2, product.image3, product.image4].filter(Boolean);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#231313] via-[#181111] to-[#2d1616] text-[#fff8f0] px-0 py-0">
      <div className="w-full flex flex-col md:flex-row items-stretch justify-center min-h-screen">
        {/* Images left */}
        <div className="flex flex-col items-center justify-center bg-[#231313] md:w-1/2 w-full p-8 md:p-16">
          <div className="w-full flex flex-col items-center">
            <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] mb-4 transition-all duration-300">
              <Image
                src={mainImg}
                alt={product.name}
                fill
                className="rounded-2xl border-4 border-orange-800 shadow-lg object-cover transition-all duration-300"
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 260px, 340px"
              />
            </div>
            <div className="flex gap-2 mt-2 flex-wrap justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`border-2 rounded-lg p-0.5 ${mainImg === img ? "border-orange-500 scale-110" : "border-orange-900"} bg-[#181111] transition-transform`}
                  onClick={() => setMainImg(img)}
                  tabIndex={0}
                  aria-label={`Show image ${idx + 1}`}
                  style={{ outline: "none" }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    width={56}
                    height={56}
                    className="rounded object-cover w-14 h-14"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Details right */}
        <div className="flex-1 flex flex-col justify-center bg-[#181111] p-6 md:p-16 w-full">
          <div className="max-w-2xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-4 text-left drop-shadow flex items-center gap-2">
              {product.name}
              {product.inStock ? (
                <span className="ml-2 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold animate-pulse">In Stock</span>
              ) : (
                <span className="ml-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold">Out of Stock</span>
              )}
            </h1>
            <div className="flex flex-wrap gap-3 mb-4">
              {product.unit && (
                <span className="bg-orange-900 text-orange-200 text-xs px-2 py-1 rounded">{product.unit}</span>
              )}
              {typeof product.quantity === "number" && (
                <span className="bg-orange-900 text-orange-200 text-xs px-2 py-1 rounded">Qty: {product.quantity}</span>
              )}
              {product.discountQty && product.discountAmount && (
                <span className="bg-green-700 text-green-100 text-xs px-2 py-1 rounded animate-bounce">
                  Buy {product.discountQty}+ get Rs.{product.discountAmount} off
                </span>
              )}
            </div>
            <div className="mb-6">
              <p className="text-orange-200 text-left text-base mb-2 italic">{product.desc}</p>
              {product.details && (
                <div className="text-orange-100 text-left mb-2 text-sm bg-[#231313] rounded p-4 border border-orange-900">
                  {product.details}
                </div>
              )}
            </div>
            <div className="mb-2 text-orange-300 font-semibold">
              Category: <span className="bg-orange-800 text-orange-100 px-2 py-1 rounded">{product.categorySlug}</span>
            </div>
            {product.tags && (
              <div className="mb-4 flex flex-wrap gap-2">
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
              <div className="mb-6 text-3xl font-bold text-orange-400 flex items-center gap-2">
                <span>Rs. {product.price}</span>
                {product.unit && <span className="text-base text-orange-200 font-normal">/ {product.unit}</span>}
              </div>
            )}
            {/* Quantity selector and order button */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="product-qty" className="text-orange-200 font-semibold">Quantity:</label>
                <input
                  id="product-qty"
                  type="number"
                  min="1"
                  max={typeof product.quantity === "number" && product.quantity > 0 ? product.quantity : undefined}
                  defaultValue={1}
                  className="w-20 px-2 py-1 rounded bg-[#231313] border border-orange-700 text-orange-200 text-lg focus:ring-2 focus:ring-orange-400 transition"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
              <Link
                href={`/checkout/${product.slug}`}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition text-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={e => {
                  // Pass quantity as query param if needed
                  const qtyInput = document.getElementById("product-qty");
                  if (qtyInput && qtyInput.value) {
                    e.preventDefault();
                    window.location.href = `/checkout/${product.slug}?qty=${qtyInput.value}`;
                  }
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7"></path></svg>
                  Order Now
                </span>
              </Link>
              <Link
                href="/products"
                className="bg-[#181111] border border-orange-700 text-orange-300 hover:bg-orange-700 hover:text-white font-semibold py-3 px-8 rounded-full shadow transition text-lg text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                ← Back to All Products
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-6px);}
        }
        .animate-bounce { animation: bounce 1.2s infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1;}
          50% { opacity: 0.6;}
        }
        .animate-pulse { animation: pulse 1.5s infinite; }
      `}</style>
    </div>
  );
}
