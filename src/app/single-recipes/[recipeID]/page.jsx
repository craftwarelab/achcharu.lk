"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getRecipeBySlug } from "../../../../lib/database";

export default function SingleRecipePage() {
  const { recipeID } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!recipeID) return;
    getRecipeBySlug(recipeID)
      .then((found) => {
        setRecipe(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [recipeID]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181111] text-[#fff8f0]">
        <span>Loading...</span>
      </div>
    );
  }
  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181111] text-red-400">
        <span>{error || "Recipe not found."}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#231313] via-[#181111] to-[#2d1616] text-[#fff8f0] px-4 py-12">
      <div className="max-w-2xl w-full bg-[#231313] rounded-2xl shadow-2xl p-8 border border-[#d7263d] flex flex-col items-center relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 rounded-full p-2 shadow-lg">
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-orange-800"
          />
        </div>
        <h1 className="text-3xl font-extrabold text-orange-400 mb-2 mt-16 text-center drop-shadow">
          {recipe.name}
        </h1>
        <p className="text-orange-200 text-center mb-4 italic">
          {recipe.desc}
        </p>
        {recipe.details && (
          <div className="text-orange-100 text-center mb-4 text-sm bg-[#181111] rounded p-3 border border-orange-900">
            {recipe.details}
          </div>
        )}
        <div className="mb-6 text-orange-300 font-semibold">
          Category: {recipe.category}
        </div>
        {recipe.tags && (
          <div className="mb-4 flex flex-wrap gap-2 justify-center">
            {recipe.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="w-full mb-4">
          <h2 className="text-xl font-bold text-orange-300 mb-2">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-orange-100">
            {recipe.ingredients &&
              recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
          </ul>
        </div>
        <div className="w-full mb-4">
          <h2 className="text-xl font-bold text-orange-300 mb-2">Steps</h2>
          <ol className="list-decimal list-inside text-orange-100">
            {recipe.steps && recipe.steps.map((step, idx) => <li key={idx}>{step}</li>)}
          </ol>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-8 px-6 py-2 bg-[#181111] border border-orange-700 text-orange-300 hover:bg-orange-700 hover:text-white font-semibold rounded-full shadow transition"
        >
          ← Back to All Recipes
        </button>
      </div>
    </div>
  );
}
