"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllCategories,
  getAllProducts,
  getAllRecipes,
} from "../../lib/database";
import { FaFire, FaChevronRight, FaStar, FaWhatsapp, FaChevronLeft } from "react-icons/fa";

const bannerSlides = [
  {
    img: "/banners/banner1.jpg",
    title: "ACHCHARU",
    subtitle: "Authentic Sri Lankan Spicy Delights",
    description: "Experience the fiery passion of traditional Sri Lankan pickles, crafted with love and the finest spices"
  },
  {
    img: "/banners/banner2.jpg",
    title: "SPICY RECIPES",
    subtitle: "Master Traditional Cooking",
    description: "Unlock the secrets of authentic Sri Lankan spicy cooking with our family recipes"
  },
  {
    img: "/banners/banner3.jpg",
    title: "HOT PICKLES",
    subtitle: "Handcrafted with Love",
    description: "From mild to volcanic heat - discover pickles that will ignite your taste buds"
  },
  {
    img: "/banners/banner4.jpg",
    title: "FIRE FLAVORS",
    subtitle: "Taste the Tradition",
    description: "Join thousands who trust Achcharu for authentic Sri Lankan spicy delights"
  }
];

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [cats, prods, recs] = await Promise.all([
        getAllCategories(),
        getAllProducts(),
        getAllRecipes(),
      ]);
      setCategories(cats);
      setProducts(prods.slice(0, 8));
      setRecipes(recs.slice(0, 6));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black text-white">
      {/* Hero Section with Image Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Slider */}
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-orange-900/80 z-10"></div>
            <div 
              className="w-full h-full bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url('${slide.img}')` }}
            ></div>
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <FaChevronRight className="text-xl" />
        </button>
        
        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <FaFire className="text-6xl text-orange-500 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent transition-all duration-1000">
            {bannerSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 font-light transition-all duration-1000">
            {bannerSlides[currentSlide].subtitle}
          </p>
          <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto transition-all duration-1000">
            {bannerSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Shop Now <FaChevronRight />
            </Link>
            <Link
              href="/recipes"
              className="border-2 border-orange-500 hover:bg-orange-500 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              View Recipes
            </Link>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Recipes Section - Main CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-orange-600 via-red-700 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/spice-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-8">
              <FaFire className="text-8xl text-yellow-400 animate-bounce mr-4" />
              <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">
                SPICY RECIPES
              </h2>
              <FaFire className="text-8xl text-yellow-400 animate-bounce ml-4" />
            </div>
            <div className="w-40 h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-2xl md:text-3xl text-white font-bold max-w-4xl mx-auto mb-6 drop-shadow-lg">
               Master Authentic Sri Lankan Fire 
            </p>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Unlock the secrets of traditional spicy cooking with our family
              recipes passed down through generations
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 animate-pulse border border-white/20"
                >
                  <div className="w-full h-64 bg-white/20 rounded-2xl mb-6"></div>
                  <div className="h-8 bg-white/20 rounded mb-4"></div>
                  <div className="h-6 bg-white/20 rounded mb-4"></div>
                  <div className="h-12 bg-white/20 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 border border-white/20 hover:border-yellow-400 shadow-2xl hover:shadow-yellow-400/20"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl">
                    <Image
                      src={recipe.image || "/logo.png"}
                      alt={recipe.name}
                      width={400}
                      height={250}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-black flex items-center gap-2 shadow-lg">
                      <FaFire className="animate-pulse" /> HOT RECIPE
                    </div>
                    <div className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      🌶️ SPICY
                    </div>
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-white group-hover:text-yellow-400 transition-colors drop-shadow-lg">
                    {recipe.name}
                  </h3>
                  <p className="text-orange-100 text-base mb-6 leading-relaxed max-h-24 overflow-hidden">
                    {recipe.desc ||
                      "Master this authentic Sri Lankan recipe and bring the heat to your kitchen!"}
                  </p>
                  <Link
                    href={`/single-recipes/${recipe.slug}`}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-lg shadow-xl hover:shadow-2xl"
                  >
                    🔥 GET RECIPE <FaChevronRight />
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-20">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto mb-8">
              <h3 className="text-3xl font-black text-white mb-4">
                🌶️ Ready to Cook Like a Pro? 🌶️
              </h3>
              <p className="text-xl text-orange-100 mb-6">
                Join thousands learning authentic Sri Lankan spicy cooking!
              </p>
            </div>
            <Link
              href="/recipes"
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 hover:from-yellow-300 hover:via-orange-400 hover:to-red-500 text-black font-black py-6 px-16 rounded-full text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-yellow-400/30 inline-flex items-center gap-4 border-4 border-white"
            >
              🔥 EXPLORE ALL RECIPES 🔥 <FaChevronRight className="text-2xl" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section - Enhanced */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-gray-900 via-orange-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-24 h-24 bg-orange-500/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-red-500/30 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-6">
              <FaFire className="text-5xl text-orange-400 animate-pulse mr-3" />
              <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl">
                SPICE CATEGORIES
              </h2>
              <FaFire className="text-5xl text-orange-400 animate-pulse ml-3" />
            </div>
            <div className="w-32 h-2 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 mx-auto mb-8 rounded-full shadow-lg"></div>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-4 font-semibold">
               Discover Our Fiery Collection 
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From mild to volcanic heat - find your perfect spice level
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 animate-pulse border border-white/20"
                >
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-white/20 rounded mb-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {categories.slice(0, 8).map((cat, index) => (
                <Link
                  key={cat.id}
                  href={`/products/category/${encodeURIComponent(cat.slug)}`}
                  className="group bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 border border-white/20 hover:border-orange-400 shadow-2xl hover:shadow-orange-400/30"
                >
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-yellow-400 flex items-center justify-center shadow-2xl group-hover:shadow-orange-400/50 transition-all duration-300">
                        <Image
                          src={cat.image || "/logo.png"}
                          alt={cat.name}
                          width={50}
                          height={50}
                          className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🔥
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-orange-300 transition-colors drop-shadow-lg mb-2">
                      {cat.name}
                    </h3>
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-black px-4 py-2 rounded-full text-sm font-bold inline-flex items-center gap-1 shadow-lg">
                      <FaFire className="text-xs" /> EXPLORE
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 hover:from-orange-300 hover:via-red-400 hover:to-yellow-300 text-black font-black py-4 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-400/40 inline-flex items-center gap-3 border-2 border-white"
            >
               VIEW ALL CATEGORIES  <FaChevronRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-400">
              Hot Picks
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our most popular spicy creations that will ignite your taste buds
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 rounded-2xl p-6 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-700 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4"></div>
                  <div className="h-10 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:from-orange-900 hover:to-red-900 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-orange-500"
                >
                  <div className="relative mb-4">
                    <Image
                      src={prod.image || "/logo.png"}
                      alt={prod.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <FaFire /> SPICY
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-300 group-hover:text-white transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {prod.desc || "Authentic Sri Lankan spicy delight"}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-400">
                      {prod.price ? `Rs. ${prod.price}` : "Price on request"}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Order Now <FaChevronRight />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-900 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <FaFire className="text-6xl text-orange-300 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Spice Up Your Life?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of spice lovers who trust Achcharu for authentic Sri
            Lankan flavors
          </p>
          <Link
            href="/products"
            className="bg-white text-red-900 hover:bg-orange-100 px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            Explore All Products <FaChevronRight />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-black via-gray-900 to-red-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-orange-400">
               What Our Spice Lovers Say 
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Real reviews from customers who can&apos;t get enough of our authentic flavors
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-orange-100 mb-6 italic leading-relaxed">
                The best spicy pickles I&apos;ve ever tasted! The heat level is perfect and the flavors are so authentic. My family is obsessed!
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  N
                </div>
                <div>
                  <p className="text-white font-semibold">Nimal Perera</p>
                  <p className="text-orange-300 text-sm">Colombo</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-orange-100 mb-6 italic leading-relaxed">
                Amazing recipes! I&apos;ve tried 5 different ones and each was better than the last. The instructions are so clear and easy to follow.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="text-white font-semibold">Samanthi Silva</p>
                  <p className="text-orange-300 text-sm">Kandy</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
              </div>
              <p className="text-orange-100 mb-6 italic leading-relaxed">
                Authentic Sri Lankan taste! Reminds me of my grandmother&apos;s cooking. The spice levels are perfect - not too mild, not too hot.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <p className="text-white font-semibold">Ruwan Fernando</p>
                  <p className="text-orange-300 text-sm">Galle</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-3xl p-6 border border-orange-500/30 max-w-2xl mx-auto">
              <p className="text-lg text-orange-100 mb-4">
                <span className="text-2xl font-bold text-yellow-400">1000+</span> Happy Customers
              </p>
              <p className="text-orange-200">
                Join our growing community of spice enthusiasts!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/94760160189"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-all border-4 border-white"
        style={{ boxShadow: "0 4px 24px 0 rgba(37, 211, 102, 0.4)" }}
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </a>
    </main>
  );
}
