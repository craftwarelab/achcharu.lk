"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllRecipes } from "../../../../lib/database";

export default function RecipesPage({response}) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // getAllRecipes()
    //   .then((data) => {
    //     setRecipes(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setLoading(false);
    //   });
    if (response) {
      setRecipes(response);
      setLoading(false);
      setError(null);
    } else {
      setError("Failed to load recipes.");
      setLoading(false);
    }
  }, [response]);

  return (
    <main className="min-h-screen bg-[#181111] text-[#fff8f0] px-4 py-12" aria-labelledby="recipes-heading">
      <div className="max-w-7xl mx-auto">
        <h1 id="recipes-heading" className="text-3xl font-extrabold text-orange-400 mb-8 text-center drop-shadow-lg">All Recipes</h1>
        <div className="flex justify-center mb-8">
          <Link href="/" className="button-accent px-5 py-2 rounded-lg font-semibold text-sm bg-gradient-to-r from-orange-700 via-orange-500 to-yellow-400 text-[#181111] shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all">Back to Home</Link>
        </div>
        {loading ? (
          <div className="text-center text-orange-300 animate-pulse" role="status">Loading spicy recipes...</div>
        ) : error ? (
          <div className="text-center text-red-400" role="alert">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-center text-orange-200">No recipes found. Check back soon!</div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" aria-label="Recipe List">
            {recipes.map((recipe, idx) => (
              <article
                key={recipe.id}
                tabIndex={0}
                className="bg-[#231313] rounded-2xl shadow-xl p-6 flex flex-col items-center border border-[#2d1616] focus:ring-2 focus:ring-orange-400 group transition-transform duration-200 hover:scale-105 hover:shadow-2xl animate-fadeIn"
                aria-labelledby={`recipe-title-${recipe.id}`}
              >
                <Image
                  src={recipe.image}
                  alt={recipe.name + ' image'}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-orange-800 mb-4 shadow-md group-hover:scale-110 transition-transform duration-200 bg-[#181111]"
                  priority={idx < 4}
                />
                <h2 id={`recipe-title-${recipe.id}`} className="text-xl font-bold text-orange-300 mb-2 text-center drop-shadow-sm">
                  {recipe.name}
                </h2>
                <p className="text-orange-200 text-center text-sm mb-4 line-clamp-3">{recipe.desc}</p>
                <div className="text-orange-400 text-xs mb-4">Category: <span className="font-semibold">{recipe.category}</span></div>
                <Link
                  href={`/single-recipes/${recipe.slug}`}
                  className="button-accent px-4 py-2 rounded font-semibold text-sm mt-auto bg-gradient-to-r from-orange-700 via-orange-500 to-yellow-400 text-[#181111] shadow hover:bg-[#d7263d] hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  aria-label={`View details for ${recipe.name}`}
                >
                  View Full Details
                </Link>
              </article>
            ))}
          </section>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1); }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
