import React from "react";

export const metadata = {
  title: "About",
}
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#181111] text-[#fff8f0] flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-[#2d1616] to-[#181111]">
        <h1 className="text-5xl font-extrabold text-orange-400 mb-4 drop-shadow-lg">
          About Achcharu
        </h1>
        <p className="text-lg text-orange-200 max-w-2xl text-center mb-2">
          Spicing up your taste buds with authentic Sri Lankan flavors!
        </p>
      </section>

      {/* Mission Section */}
      <section className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-orange-300 mb-3">Our Mission</h2>
        <p className="text-base text-orange-100 mb-4">
          Achcharu is dedicated to celebrating the vibrant, spicy, and diverse
          world of Sri Lankan cuisine. Our mission is to bring the heat and heart
          of Sri Lanka to your kitchen, making it easy for food lovers everywhere
          to discover, cook, and enjoy traditional and modern recipes.
        </p>
      </section>

      {/* Culture Section */}
      <section className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-orange-300 mb-3">
          Sri Lankan Food Culture
        </h2>
        <p className="text-base text-orange-100 mb-4">
          Sri Lankan food is a celebration of spices, colors, and community. From
          fiery curries to tangy pickles (achcharu!), every dish tells a story of
          heritage and togetherness. We believe food is best enjoyed when shared,
          and our platform is designed to help you explore, create, and connect
          through the love of Sri Lankan cuisine.
        </p>
      </section>

      {/* Fun Fact Section */}
      <section className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-orange-300 mb-3">Did You Know?</h2>
        <p className="text-base text-orange-100 mb-4">
          The word "Achcharu" refers to a spicy Sri Lankan pickle, a street food
          favorite that perfectly captures the island's love for bold flavors!
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col items-center justify-center py-10">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">
          Ready to spice up your kitchen?
        </h3>
        <a
          href="/recipes"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
        >
          Explore Recipes
        </a>
      </section>
    </div>
  );
};
