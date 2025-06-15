"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const themes = {
  dark: {
    section: "bg-[#181111] text-[#fff8f0]",
    card: "bg-[#231313] text-[#fff8f0] border-[#2d1616]",
    accent: "bg-[#ff2d20] text-white hover:bg-[#d7263d] focus:ring-2 focus:ring-orange-400",
    link: "text-[#ff2d20] hover:text-[#ff9800] focus:underline",
  },
  red: {
    section: "bg-[#fff5f5] text-[#a31515]",
    card: "bg-white text-[#a31515] border-[#ffd6d6]",
    accent: "bg-[#d7263d] text-white hover:bg-[#ff2d20] focus:ring-2 focus:ring-orange-400",
    link: "text-[#d7263d] hover:text-[#ff9800] focus:underline",
  },
  light: {
    section: "bg-[#fffdfa] text-[#1a1a1a]",
    card: "bg-[#fffdfa] text-[#1a1a1a] border-[#ffe0b2]",
    accent: "bg-[#ff9800] text-white hover:bg-[#ff2d20] focus:ring-2 focus:ring-orange-400",
    link: "text-[#ff9800] hover:text-[#d7263d] focus:underline",
  },
};

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark");

  // Carousel data for featured images
  const featuredImages = [
    { src: "/carousel1.jpg", alt: "Spicy Mango Achcharu" },
    { src: "/carousel2.jpg", alt: "Traditional Lime Pickle" },
    { src: "/carousel3.jpg", alt: "Chili Garlic Chutney" },
  ];
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef();
  const nextSlide = () => setCarouselIdx((i) => (i + 1) % featuredImages.length);
  const prevSlide = () => setCarouselIdx((i) => (i - 1 + featuredImages.length) % featuredImages.length);

  // Spices data for carousel
  const spices = [
    { name: "Ceylon Cinnamon", img: "/spices/cinnamon.jpg", desc: "Sweet, woody, and essential for curries." },
    { name: "Cardamom", img: "/spices/cardamom.jpg", desc: "Aromatic pods for rice and desserts." },
    { name: "Cloves", img: "/spices/cloves.jpg", desc: "Warm, pungent, and deeply flavorful." },
    { name: "Mustard Seeds", img: "/spices/mustard.jpg", desc: "Nutty, spicy, and used for tempering." },
    { name: "Curry Leaves", img: "/spices/curry-leaves.jpg", desc: "Earthy, citrusy, and iconic in Sri Lankan cuisine." },
    { name: "Dried Red Chilies", img: "/spices/chili.jpg", desc: "Adds heat and color to every dish." },
  ];
  const [spiceIdx, setSpiceIdx] = useState(0);
  const nextSpice = () => setSpiceIdx((i) => (i + 1) % spices.length);
  const prevSpice = () => setSpiceIdx((i) => (i - 1 + spices.length) % spices.length);

  // Chefs data for carousel
  const chefs = [
    { name: "Chef Nimal Perera", img: "/chefs/nimal.jpg", bio: "30+ years of spicy tradition, master of achcharu." },
    { name: "Chef Samanthi Silva", img: "/chefs/samanthi.jpg", bio: "Queen of pickles and home-style flavors." },
    { name: "Chef Ruwan Jayasuriya", img: "/chefs/ruwan.jpg", bio: "Fusion innovator, blending old and new." },
  ];
  const [chefIdx, setChefIdx] = useState(0);
  const nextChef = () => setChefIdx((i) => (i + 1) % chefs.length);
  const prevChef = () => setChefIdx((i) => (i - 1 + chefs.length) % chefs.length);

  useEffect(() => {
    fetch("/catogory.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const t = themes[theme];

  return (
    <main className={`flex flex-col min-h-screen ${t.section} font-sans`} aria-label="Achcharu Home">
      {/* Decorative animated background gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-orange-900/40 via-transparent to-yellow-700/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-yellow-500/30 via-transparent to-orange-700/40 rounded-full blur-2xl animate-pulse-slow" />
      </div>
      {/* Hero Section */}
      <section className={`flex flex-col items-center justify-center py-12 ${t.section} animate-heroFadeIn`}>
        <Image
          src="/spice-logo.png"
          alt="Achcharu Logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg mb-4 animate-popIn"
          priority
        />
        <h1 className="text-4xl font-extrabold mb-2 text-center drop-shadow-lg tracking-tight">Achcharu</h1>
        <p className="text-lg max-w-xl text-center mb-4">
          Discover the vibrant flavors of Sri Lankan home-made spicy foods! Explore authentic recipes, cooking tips, and the stories behind your favorite dishes.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="/recipes" className={`rounded-full ${t.accent} px-6 py-2 font-medium shadow focus:outline-none transition-all`} tabIndex={0} aria-label="Browse Recipes">Browse Recipes</a>
          <a href="/about" className={`rounded-full border ${t.card} px-6 py-2 font-medium shadow focus:outline-none transition-all`} tabIndex={0} aria-label="About Us">About Us</a>
        </div>
      </section>
      {/* Category Grid Section */}
      <section className="px-4 sm:px-12 py-12" aria-labelledby="category-heading">
        <h2 id="category-heading" className="text-2xl font-bold mb-8 text-center text-orange-400 drop-shadow">Categories</h2>
        {loading ? (
          <div className="text-center text-orange-300 animate-pulse" role="status">Loading categories...</div>
        ) : error ? (
          <div className="text-center text-red-400" role="alert">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-orange-200">No categories found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, idx) => (
              <article
                key={cat.id}
                tabIndex={0}
                className={`rounded-lg shadow-md flex flex-col items-center p-6 hover:shadow-xl transition-all duration-200 ${t.card} border animate-fadeIn`}
                aria-labelledby={`cat-title-${cat.id}`}
              >
                <Image src={cat.image} alt={cat.name + ' icon'} width={80} height={80} className="rounded-full border-4 border-orange-800 mb-4 bg-[#181111] group-hover:scale-110 transition-transform duration-200" />
                <h3 id={`cat-title-${cat.id}`} className="text-xl font-bold mb-2 text-center drop-shadow-sm">{cat.name}</h3>
                <ul className="text-sm list-disc pl-4 mb-4 text-left">
                  {cat.items.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={`/category/${encodeURIComponent(cat.name)}`} className={`${t.link} mt-auto font-medium focus:outline-none`} tabIndex={0} aria-label={`View all in ${cat.name}`}>View All</a>
              </article>
            ))}
          </div>
        )}
      </section>
      {/* Featured Recipe Section with Carousel */}
      <section className={`py-10 px-4 sm:px-12 text-center ${t.section}`} aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="text-2xl font-bold mb-2 text-orange-400 drop-shadow">Featured Recipe</h2>
        <div className="relative max-w-xl mx-auto mb-4">
          <button onClick={prevSlide} aria-label="Previous" className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700 focus:outline-none z-10">&#8592;</button>
          <Image
            src={featuredImages[carouselIdx].src}
            alt={featuredImages[carouselIdx].alt}
            width={400}
            height={250}
            className="rounded-xl shadow-lg object-cover mx-auto transition-all duration-500"
            priority
          />
          <button onClick={nextSlide} aria-label="Next" className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700 focus:outline-none z-10">&#8594;</button>
        </div>
        <p className="max-w-2xl mx-auto mb-4">
          Try our most popular spicy achcharu recipe, loved by everyone for its unique taste and aroma!
        </p>
        <a href="/recipes/featured" className={`inline-block rounded-full ${t.accent} px-6 py-2 font-medium shadow focus:outline-none transition-all`} tabIndex={0} aria-label="See Featured Recipe">See Recipe</a>
      </section>
      {/* Sri Lankan Spices Section with Carousel */}
      <section className={`py-10 px-4 sm:px-12 text-center ${t.section}`} aria-labelledby="spices-heading">
        <h2 id="spices-heading" className="text-2xl font-bold mb-2 text-orange-400 drop-shadow">Sri Lankan Spices</h2>
        <div className="relative max-w-lg mx-auto mb-4">
          <button onClick={prevSpice} aria-label="Previous Spice" className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700 focus:outline-none z-10">&#8592;</button>
          <div className="flex flex-col items-center">
            <Image src={spices[spiceIdx].img} alt={spices[spiceIdx].name} width={120} height={120} className="rounded-full border-4 border-orange-800 mb-2 object-cover" />
            <h3 className="text-lg font-bold text-orange-300 mb-1">{spices[spiceIdx].name}</h3>
            <p className="text-orange-200 text-sm mb-2">{spices[spiceIdx].desc}</p>
          </div>
          <button onClick={nextSpice} aria-label="Next Spice" className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700 focus:outline-none z-10">&#8594;</button>
        </div>
        <p className="max-w-xl mx-auto text-orange-100">These spices are the heart of Sri Lankan cuisine. Discover their unique flavors in our recipes!</p>
      </section>
      {/* Meet the Chefs Section with Carousel */}
      <section className={`py-10 px-4 sm:px-12 text-center ${t.section}`} aria-labelledby="chefs-heading">
        <h2 id="chefs-heading" className="text-2xl font-bold mb-2 text-orange-400 drop-shadow">Meet the Chefs</h2>
        <div className="relative max-w-lg mx-auto mb-4">
          <button onClick={prevChef} aria-label="Previous Chef" className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700 focus:outline-none z-10">&#8592;</button>
          <div className="flex flex-col items-center">
            <Image src={chefs[chefIdx].img} alt={chefs[chefIdx].name} width={120} height={120} className="rounded-full border-4 border-orange-800 mb-2 object-cover" />
            <h3 className="text-lg font-bold text-orange-300 mb-1">{chefs[chefIdx].name}</h3>
            <p className="text-orange-200 text-sm mb-2">{chefs[chefIdx].bio}</p>
          </div>
          <button onClick={nextChef} aria-label="Next Chef" className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#231313] text-orange-400 rounded-full p-2 shadow hover:bg-orange-700 focus:outline-none z-10">&#8594;</button>
        </div>
        <p className="max-w-xl mx-auto text-orange-100">Our chefs bring authentic taste and passion to every dish. Get to know the people behind the spice!</p>
      </section>
      {/* How It Works Section - Enhanced */}
      <section className="py-16 px-4 sm:px-12 text-center relative overflow-hidden" aria-labelledby="how-heading">
        <h2 id="how-heading" className="text-3xl font-extrabold mb-8 text-orange-400 drop-shadow tracking-tight">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch relative z-10">
          <div className={`relative rounded-2xl shadow-xl p-8 w-full md:w-1/3 ${t.card} border border-orange-900 group transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn`}>  
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-orange-500 to-yellow-400 text-[#181111] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-[#231313] group-hover:scale-110 transition-transform">1</div>
            <h3 className="font-bold text-lg mb-2 mt-10">Choose a Category</h3>
            <p className="text-orange-200">Browse our wide range of spicy food categories and discover something new every time.</p>
          </div>
          <div className={`relative rounded-2xl shadow-xl p-8 w-full md:w-1/3 ${t.card} border border-orange-900 group transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn`}>  
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-orange-500 to-yellow-400 text-[#181111] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-[#231313] group-hover:scale-110 transition-transform">2</div>
            <h3 className="font-bold text-lg mb-2 mt-10">Pick a Recipe</h3>
            <p className="text-orange-200">Select your favorite recipe from our curated list, tailored for all spice lovers.</p>
          </div>
          <div className={`relative rounded-2xl shadow-xl p-8 w-full md:w-1/3 ${t.card} border border-orange-900 group transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fadeIn`}>  
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-orange-500 to-yellow-400 text-[#181111] rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-[#231313] group-hover:scale-110 transition-transform">3</div>
            <h3 className="font-bold text-lg mb-2 mt-10">Start Cooking</h3>
            <p className="text-orange-200">Follow the easy steps, enjoy the aroma, and serve up a spicy Sri Lankan feast!</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30 bg-gradient-to-br from-orange-900 via-transparent to-yellow-700" />
      </section>
      {/* Testimonials Section - Enhanced */}
      <section className={`py-16 px-4 sm:px-12 text-center relative overflow-hidden ${t.section}`} aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading" className="text-3xl font-extrabold mb-8 text-orange-400 drop-shadow tracking-tight">What Our Users Say</h2>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch relative z-10">
          <blockquote className={`relative rounded-2xl shadow-xl p-8 w-full md:w-1/3 ${t.card} border border-orange-900 animate-fadeIn group transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}>
            <svg className="absolute -top-6 left-6 w-10 h-10 text-orange-400 opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6.17A7 7 0 0 0 3 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-3.83-6.17zM17.17 6.17A7 7 0 0 0 13 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-3.83-6.17z"/></svg>
            <p className="italic text-orange-100 text-lg mb-4">“The best spicy food recipes I have ever tried!”</p>
            <span className="block mt-2 font-semibold text-orange-300">- Nimal, Colombo</span>
          </blockquote>
          <blockquote className={`relative rounded-2xl shadow-xl p-8 w-full md:w-1/3 ${t.card} border border-orange-900 animate-fadeIn group transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}>
            <svg className="absolute -top-6 left-6 w-10 h-10 text-orange-400 opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6.17A7 7 0 0 0 3 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-3.83-6.17zM17.17 6.17A7 7 0 0 0 13 13v1a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-1a7 7 0 0 0-3.83-6.17z"/></svg>
            <p className="italic text-orange-100 text-lg mb-4">“Easy to follow and delicious results every time.”</p>
            <span className="block mt-2 font-semibold text-orange-300">- Samanthi, Kandy</span>
          </blockquote>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20 bg-gradient-to-br from-orange-900 via-transparent to-yellow-700" />
      </section>
      {/* About Section */}
      <section className={`py-10 px-4 sm:px-12 text-center ${t.section}`} aria-labelledby="about-heading">
        <h2 id="about-heading" className="text-2xl font-bold mb-2 text-orange-400 drop-shadow">About Achcharu</h2>
        <p className="max-w-2xl mx-auto">
          Achcharu is your gateway to the world of Sri Lankan spicy home-made foods. We bring you the best recipes, tips, and stories from local kitchens. Whether you love pickles, chutneys, or spicy bites, you&apos;ll find something to excite your taste buds!
        </p>
      </section>
      {/* Call to Action Section */}
      <section className={`flex flex-col items-center justify-center py-12 ${t.section}`} aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-2xl font-bold mb-4 text-orange-400 drop-shadow">Ready to Spice Up Your Kitchen?</h2>
        <a href="/recipes" className={`rounded-full ${t.accent} px-8 py-3 font-medium text-lg shadow focus:outline-none transition-all`} tabIndex={0} aria-label="Start Cooking">Start Cooking</a>
      </section>
      {/* Newsletter Signup Section */}
      <section className={`py-10 px-4 sm:px-12 text-center ${t.section}`} aria-labelledby="newsletter-heading">
        <h2 id="newsletter-heading" className="text-2xl font-bold mb-2 text-orange-400 drop-shadow">Get the Latest Recipes</h2>
        <p className="max-w-xl mx-auto mb-4">Subscribe to our newsletter for new recipes and spicy food tips!</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto" aria-label="Newsletter Signup" onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
          <input type="email" placeholder="Your email" className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-400" aria-label="Your email" required />
          <button type="submit" className={`rounded ${t.accent} px-6 py-2 font-medium shadow focus:outline-none transition-all`} aria-label="Subscribe">Subscribe</button>
        </form>
      </section>
      {/* Sticky WhatsApp order button */}
      <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-300 animate-bounce-short">
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10A10 10 0 0 1 12 22Zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.72.9-.88 1.08-.32.21-.6.07a8.13 8.13 0 0 1-2.4-1.48 9.06 9.06 0 0 1-1.68-2.08c-.18-.31 0-.48.13-.62.13-.13.28-.34.42-.51a.56.56 0 0 0 .08-.56c-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48h-.53a1 1 0 0 0-.72.34A2.94 2.94 0 0 0 6.2 9.6c0 .34.05.68.14 1a10.13 10.13 0 0 0 2.2 3.6 10.13 10.13 0 0 0 3.6 2.2c.32.09.66.14 1 .14a2.94 2.94 0 0 0 1.94-.8 1 1 0 0 0 .34-.72v-.53c-.01-.17.06-.4-.48-.62Z"/></svg>
        <span className="hidden sm:inline font-bold">Order on WhatsApp</span>
      </a>
      <style jsx>{`
        .font-sans { font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        .animate-heroFadeIn { animation: heroFadeIn 1.2s cubic-bezier(0.4,0,0.2,1); }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-popIn { animation: popIn 0.7s cubic-bezier(0.4,0,0.2,1); }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1); }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-short { animation: bounce-short 1.5s infinite; }
      `}</style>
    </main>
  );
}
