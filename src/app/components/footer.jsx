import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#231313] via-[#181111] to-[#2d1616] text-[#fff8f0] border-t-2 border-orange-900 py-12 px-4 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Quick Access Links */}
        <div>
          <h3 className="text-lg font-extrabold mb-4 text-orange-400 tracking-wide">Quick Access</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-orange-200 focus:text-orange-300 transition">Home</Link></li>
            <li><Link href="/recipes" className="hover:text-orange-200 focus:text-orange-300 transition">Recipes</Link></li>
            <li><Link href="/products" className="hover:text-orange-200 focus:text-orange-300 transition">Products</Link></li>
            <li><Link href="/about" className="hover:text-orange-200 focus:text-orange-300 transition">About</Link></li>
            <li><Link href="/contact" className="hover:text-orange-200 focus:text-orange-300 transition">Contact</Link></li>
          </ul>
        </div>
        {/* About Company */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold mb-4 text-orange-400 tracking-wide">About Achcharu</h3>
            <p className="text-sm leading-relaxed text-orange-100">
              Achcharu is dedicated to bringing you the best of Sri Lankan home-made spicy foods. Our mission is to celebrate authentic flavors, support local food artisans, and share the joy of traditional recipes with the world. Taste the spice, feel the culture!
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <Image src="/spice-logo.png" alt="Achcharu Logo" width={36} height={36} className="rounded-full border-2 border-orange-500" />
            <span className="font-extrabold text-orange-300 text-lg tracking-wider">achcharu</span>
          </div>
        </div>
        {/* Social Media & Other Details */}
        <div>
          <h3 className="text-lg font-extrabold mb-4 text-orange-400 tracking-wide">Connect With Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-200 focus:text-orange-300 transition" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="#" className="hover:text-orange-200 focus:text-orange-300 transition" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="#" className="hover:text-orange-200 focus:text-orange-300 transition" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
          <div className="mt-8 text-xs text-orange-300 space-y-1">
            <div>© {new Date().getFullYear()} Achcharu. All rights reserved.</div>
            <div>Colombo, Sri Lanka</div>
            <div>Email: <a href="mailto:info@achcharu.com" className="underline hover:text-orange-200 focus:text-orange-300">info@achcharu.com</a></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
