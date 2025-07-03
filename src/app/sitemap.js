import { getAllProducts, getAllRecipes } from "../../lib/database";

export default async function sitemap() {
  const baseUrl = "https://achcharu.lk";
  const [products, recipes] = await Promise.all([
    getAllProducts(),
    getAllRecipes(),
  ]);

  // Static pages
  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/recipes`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  // Product pages
  const productUrls = products.map(prod => ({
    url: `${baseUrl}/products/${encodeURIComponent(prod.slug)}`,
    lastModified: new Date(),
  }));

  // Recipe pages
  const recipeUrls = recipes.map(rec => ({
    url: `${baseUrl}/single-recipes/${encodeURIComponent(rec.slug)}`,
    lastModified: new Date(),
  }));

  return [
    ...staticUrls,
    ...productUrls,
    ...recipeUrls,
  ];
}