"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllCategories,
  getAllProducts,
  getAllRecipes,
} from "../../lib/database";

const bannerSlides = [
  {
    img: "/banners/banner1.jpg",
    text: "Discover Authentic Sri Lankan Achcharu",
    button: { label: "Shop Now", href: "/products" },
  },
  {
    img: "/banners/banner2.jpg",
    text: "Spice Up Your Life with Our Pickles",
    button: { label: "See Recipes", href: "/recipes" },
  },
  {
    img: "/banners/banner3.jpg",
    text: "Handcrafted Flavors, Delivered Fresh",
    button: null,
  },
  {
    img: "/banners/banner4.jpg",
    text: "Taste the Tradition, Love the Heat",
    button: { label: "About Us", href: "/about" },
  },
];

export default function Home() {
  // Banner carousel
  const [bannerIdx, setBannerIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setBannerIdx((i) => (i + 1) % bannerSlides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);
  const nextBanner = () => setBannerIdx((i) => (i + 1) % bannerSlides.length);
  const prevBanner = () =>
    setBannerIdx((i) => (i - 1 + bannerSlides.length) % bannerSlides.length);

  // Data
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [cats, prods, recs] = await Promise.all([
        getAllCategories(),
        getAllProducts(),
        getAllRecipes(),
      ]);
      setCategories(cats);
      setProducts(prods.slice(0, 15));
      setRecipes(recs.slice(0, 4));
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="font-sans bg-[#181111] text-[#fff8f0]">
      {/* Section 1: Banner Carousel */}
      <section className="relative w-full h-[380px] md:h-[480px] flex items-center justify-center overflow-hidden">
        <button
          onClick={prevBanner}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700"
        >
          &#8592;
        </button>
        {bannerSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
              idx === bannerIdx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={idx !== bannerIdx}
          >
            <Image
              src={slide.img}
              alt={slide.text}
              fill
              className="object-cover w-full h-full"
              style={{ zIndex: 0, opacity: 0.7 }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg mb-4">
                {slide.text}
              </h2>
              {slide.button && (
                <Link
                  href={slide.button.href}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow transition"
                >
                  {slide.button.label}
                </Link>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={nextBanner}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700"
        >
          &#8594;
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {bannerSlides.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx === bannerIdx ? "bg-orange-500" : "bg-orange-200 opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Section 2: About Us */}
      <section className="py-12 px-4 sm:px-12 text-center bg-[#231313]">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-orange-100">
          Achcharu brings the taste of Sri Lankan home-made spicy foods to your
          table. We are passionate about authentic recipes, quality ingredients,
          and sharing the joy of spicy flavors with the world.
        </p>
      </section>

      {/* Section 3: Feature Categories */}
      <section className="py-12 px-4 sm:px-12 bg-[#181111]">
        <h2 className="text-2xl font-bold text-orange-400 mb-8 text-center">
          Featured Categories
        </h2>
        {loading ? (
          <div className="text-center text-orange-300 animate-pulse">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/products/category/${encodeURIComponent(cat.slug)}`}
                className="rounded-lg shadow-md flex flex-col items-center p-6 bg-[#231313] border border-[#2d1616] hover:shadow-xl transition"
              >
                <Image
                  src={cat.image || "/logo.png"}
                  alt={cat.name}
                  width={100}
                  height={100}
                  className="rounded-full border-1 object-cover w-[100px] h-[100px] border-orange-500 mb-4 bg-[#181111]"
                />
                <h3 className="text-xl font-bold mb-2 text-center text-orange-300">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Feature Products */}
      <section className="py-12 px-4 sm:px-12 bg-[#231313]">
        <h2 className="text-2xl font-bold text-orange-400 mb-8 text-center">
          Featured Products
        </h2>
        {loading ? (
          <div className="text-center text-orange-300 animate-pulse">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {products.map((prod) => (
              <div
                key={prod.id}
                // href={`/products/${prod.slug}`}
                className="rounded-lg shadow-md flex flex-col items-center p-6 bg-[#181111] border border-[#2d1616] hover:shadow-xl transition"
              >
                <Image
                  src={prod.image || "/logo.png"}
                  alt={prod.name}
                width={200}
                  height={200}
                  className="rounded-full border-1 object-cover w-[100px] h-[100px] border-orange-500 mb-4 bg-[#181111]"
                />
                <h3 className="text-lg font-bold mb-2 text-center text-orange-300">
                  {prod.name}
                </h3>
                <div className="text-orange-200 mb-2">
                  {prod.price ? `Rs. ${prod.price}` : "-"}
                </div>
                <div className="text-orange-100 text-sm text-center mb-2">
                  {prod.desc && prod.desc.length > 10
                    ? prod.desc.slice(0, 100) + "..."
                    : prod.desc}
                </div>
                <Link
                  href={`/products/${prod.slug}`}
                  className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded-full shadow transition"
                >
                  Order Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 5: Feature Video */}
      <section className="py-12 px-4 sm:px-12 bg-[#181111] flex flex-col items-center">
        <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">
          Featured Video
        </h2>
        <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-orange-900 mx-auto">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/IjtFJBuagkY"
            title="සුපිරි අච්චාරු වර්ග 7ක් සමඟින් පැණි වෙරළු අච්චාරුව | 7 Types of Srilankan Achcharu Sinhala"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* Section 6: What Our Users Say */}
      <section className="py-12 px-4 sm:px-12 bg-[#231313] text-center">
        <h2 className="text-2xl font-bold text-orange-400 mb-8">
          Testimonials
        </h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
          <blockquote className="rounded-2xl shadow-xl p-8 w-full md:w-1/3 bg-[#181111] border border-orange-900">
            <p className="italic text-orange-100 text-lg mb-4">
              “The best spicy food recipes I have ever tried!”
            </p>
            <span className="block mt-2 font-semibold text-orange-300">
              - Nimal, Colombo
            </span>
          </blockquote>
          <blockquote className="rounded-2xl shadow-xl p-8 w-full md:w-1/3 bg-[#181111] border border-orange-900">
            <p className="italic text-orange-100 text-lg mb-4">
              “Easy to follow and delicious results every time.”
            </p>
            <span className="block mt-2 font-semibold text-orange-300">
              - Samanthi, Kandy
            </span>
          </blockquote>
          <blockquote className="rounded-2xl shadow-xl p-8 w-full md:w-1/3 bg-[#181111] border border-orange-900">
            <p className="italic text-orange-100 text-lg mb-4">
              “My family loves the authentic flavors!”
            </p>
            <span className="block mt-2 font-semibold text-orange-300">
              - Ruwan, Galle
            </span>
          </blockquote>
        </div>
      </section>

      {/* Section 7: Feature Recipes */}
      <section className="py-12 px-4 sm:px-12 bg-[#181111]">
        <h2 className="text-2xl font-bold text-orange-400 mb-8 text-center">
          Featured Recipes
        </h2>
        {loading ? (
          <div className="text-center text-orange-300 animate-pulse">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="rounded-lg shadow-md flex flex-col items-center p-6 bg-[#231313] border border-[#2d1616]"
              >
                <Image
                  src={recipe.image || "/spice-logo.png"}
                  alt={recipe.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-orange-800 mb-4 bg-[#181111]"
                />
                <h3 className="text-lg font-bold mb-2 text-center text-orange-300">
                  {recipe.name}
                </h3>
                <div className="text-orange-100 text-sm text-center mb-2">
                  {recipe.desc}
                </div>
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-4 rounded-full shadow transition"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
//         .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
//         @keyframes bounce-short {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-bounce-short { animation: bounce-short 1.5s infinite; }
//       `}</style>
//     </main>
//   );
// }
