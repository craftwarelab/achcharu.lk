export default function manifest() {
  return {
    name: "Achcharu - Authentic Sri Lankan Spicy Foods",
    short_name: "Achcharu",
    description: "Achcharu brings the taste of Sri Lankan home-made spicy foods to your table. Discover authentic recipes, quality ingredients, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#181111",
    theme_color: "#d7263d",
    lang: "en",
    icons: [
      {
        src: "/logo/logo.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/logo/logo.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}