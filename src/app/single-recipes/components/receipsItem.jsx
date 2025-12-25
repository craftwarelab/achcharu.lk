"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getRecipeBySlug } from "../../../../lib/database";
import { FaFire, FaClock, FaUsers, FaArrowLeft, FaTag, FaUtensils } from "react-icons/fa";

export default function SingleRecipePage({ response }) {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    if (!response) return;
    if (response) {
      setRecipe(response);
      setLoading(false);
      setError(null);
    }
  }, [response]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-black">
        <div className="text-center">
          <FaFire className="text-6xl text-orange-500 animate-pulse mx-auto mb-4" />
          <span className="text-xl text-white">Loading Recipe...</span>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-black">
        <div className="text-center">
          <div className="text-6xl mb-4">🌶️</div>
          <span className="text-xl text-red-400">{error || "Recipe not found."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-orange-500/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-orange-300 hover:text-white transition-colors"
          >
            <FaArrowLeft /> Back to Recipes
          </button>
          <div className="flex items-center gap-2">
            <FaFire className="text-orange-500" />
            <span className="text-white font-bold">Achcharu Recipes</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={recipe.image}
                alt={recipe.name}
                width={600}
                height={400}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <FaFire /> SPICY RECIPE
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            {/* Title & Description */}
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {recipe.name}
              </h1>
              <p className="text-xl text-orange-100 leading-relaxed">
                {recipe.desc}
              </p>
            </div>

            {/* Recipe Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <FaClock className="text-orange-400" />
                  <span className="text-white font-semibold">Prep Time</span>
                </div>
                <span className="text-orange-200">{recipe.prepTime || '30 mins'}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <FaUsers className="text-orange-400" />
                  <span className="text-white font-semibold">Serves</span>
                </div>
                <span className="text-orange-200">{recipe.serves || '4 people'}</span>
              </div>
            </div>

            {/* Category & Tags */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-orange-400" />
                <span className="text-white font-semibold">Category:</span>
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {recipe.category}
                </span>
              </div>
              
              {recipe.tags && (
                <div className="flex items-center gap-2 flex-wrap">
                  <FaTag className="text-orange-400" />
                  {recipe.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 backdrop-blur-sm text-orange-200 px-3 py-1 rounded-full text-sm border border-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Details */}
            {recipe.details && (
              <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-300 mb-3">Recipe Notes</h3>
                <p className="text-orange-100 leading-relaxed">{recipe.details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients & Steps Tabs */}
        <div className="mt-16">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'ingredients'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-white/10 backdrop-blur-sm text-orange-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              🥄 Ingredients
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'steps'
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                  : 'bg-white/10 backdrop-blur-sm text-orange-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              📝 Instructions
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            {activeTab === 'ingredients' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  🥄 Ingredients
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {recipe.ingredients?.map((ing, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-orange-100">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'steps' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  📝 Cooking Instructions
                </h2>
                <div className="space-y-6">
                  {recipe.steps?.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-orange-100 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/30">
            <h3 className="text-2xl font-bold text-white mb-4"> Enjoyed This Recipe? </h3>
            <p className="text-orange-100 mb-6">Explore more authentic Sri Lankan spicy recipes!</p>
            <button
              onClick={() => router.push('/recipes')}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔥 More Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
