
// import { useParams } from "next/navigation";
import { getRecipeBySlug } from "../../../../lib/database"; // Adjust the import path as necessary
import SingleRecipePage from "../components/receipsItem";

export async function generateMetadata({ params }) {
  const { recipeID } = params;
  let recipe;
  
  try {
    recipe = await getRecipeBySlug(recipeID); // Assuming this function fetches the recipe data
  } catch (error) {
    console.error("Error fetching recipe data:", error);
  }

  return {
    title: `${recipe.name}`, // Replace with actual recipe name if available
    description: `Details about the recipe ${recipe.name}`,
    openGraph: {
      title: recipe.name,
      description: recipe.ingredients || "Delicious recipe details",
      images: [
        {
          url: recipe.image || "/default-recipe-image.jpg", // Fallback image
          alt: recipe.name,
        },
      ],
    },
  };
}

export default function Page({ params }) {
  const { recipeID } = params;
  return (
    <SingleRecipePage recipeID={recipeID} />
  );
}
