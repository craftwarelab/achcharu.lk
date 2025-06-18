"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllProducts, getAllCategories } from "../../../lib/database";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load categories from Firebase DB
    const loadCats = async () => {
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (err) {
        setCategories([]);
      }
    };
    loadCats();
    // fetch("/products.json")
    //   .then((res) => res.json())
    //   .then(setProducts);
    const loadData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    }
    loadData().catch((error) => {
      console.error("Error loading products:", error);
    });
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full shadow-lg border-b bg-gradient-to-r from-[#231313] via-[#181111] to-[#2d1616] border-[#2d1616] sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo/logo.png"
            alt="Achcharu Logo"
            width={64}
            height={64}
            className="rounded-full border border-orange-200 group-hover:scale-110 transition-transform"
          />
          <span className="text-2xl font-extrabold text-orange-400 tracking-wider drop-shadow">
            achcharu
          </span>
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-orange-700 focus:outline-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Desktop Navbar Links and Categories */}
        <ul className="hidden sm:flex gap-6 items-center ml-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-orange-400 font-semibold hover:text-orange-200 transition px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Product Dropdown */}
          <li className="relative group">
            <button
              className="text-orange-400 font-semibold hover:text-orange-200 transition focus:outline-none px-2 py-1 rounded focus:ring-2 focus:ring-orange-400"
              type="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Products
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-[#231313] shadow-lg rounded-md min-w-[260px] z-50 hidden group-hover:block max-h-[60vh] overflow-y-auto border border-orange-900">
              {products.slice(0, 20).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-[#2d1616] text-orange-200 text-sm rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width={24}
                    height={24}
                    className="rounded-full border border-orange-800"
                  />
                  <span>{product.name}</span>
                </Link>
              ))}
              {products.length > 20 && (
                <Link
                  href="/products"
                  className="block px-4 py-2 text-center text-orange-400 hover:text-orange-200"
                >
                  View All Products
                </Link>
              )}
            </div>
          </li>
          {/* Category Dropdown */}
          <li className="relative group">
            <button
              className="text-orange-400 font-semibold hover:text-orange-200 transition focus:outline-none px-2 py-1 rounded focus:ring-2 focus:ring-orange-400"
              type="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Categories
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-[#231313] shadow-lg rounded-md min-w-[220px] z-50 hidden group-hover:block max-h-[60vh] overflow-y-auto border border-orange-900">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/category/${encodeURIComponent(cat.slug)}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-[#2d1616] text-orange-200 text-sm rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={28}
                    height={28}
                    className="rounded-full border border-orange-800"
                  />
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </li>
        </ul>
      </div>
      {/* All Categories Modal/Dropdown for Desktop */}
      {showAllCategories && (
        <div
          className="hidden sm:block fixed inset-0 bg-black bg-opacity-30 z-50"
          onClick={() => setShowAllCategories(false)}
        >
          <div
            className="absolute left-1/2 top-24 -translate-x-1/2 bg-[#231313] rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw] border border-orange-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-orange-200">
              All Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products/category/${encodeURIComponent(cat.slug)}`}
                  className="flex flex-col items-center hover:bg-[#2d1616] rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={48}
                    height={48}
                    className="rounded-full border border-orange-800"
                  />
                  <span className="mt-2 text-orange-200 font-semibold text-sm">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
            <button
              className="mt-6 px-4 py-2 bg-[#ff2d20] text-white rounded hover:bg-[#d7263d] focus:outline-none focus:ring-2 focus:ring-orange-400"
              onClick={() => setShowAllCategories(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-[#231313] px-4 pb-4 border-t border-orange-900">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-orange-400 font-semibold hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="block w-full text-left text-orange-400 font-semibold py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => setShowAllCategories((v) => !v)}
              >
                Categories
              </button>
            </li>
          </ul>
          {/* All Categories for Mobile */}
          {showAllCategories && (
            <div className="bg-[#181111] rounded-lg shadow-lg p-4 mt-2 border border-orange-900">
              <h2 className="text-lg font-bold mb-4 text-orange-200">
                All Categories
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/category/${encodeURIComponent(cat.slug)}`}
                    className="flex flex-col items-center hover:bg-[#2d1616] rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      width={40}
                      height={40}
                      className="rounded-full border border-orange-800"
                    />
                    <span className="mt-2 text-orange-200 font-semibold text-sm">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
              <button
                className="mt-6 px-4 py-2 bg-[#ff2d20] text-white rounded hover:bg-[#d7263d] w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => setShowAllCategories(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}