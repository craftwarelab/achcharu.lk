import RecipesPage from "./components/receips";
import { getAllRecipes } from "../../../lib/database";

export const metadata = {
  title: "Recipes"
}
export default async function Page() {
  let response;
  try {
    response = await getAllRecipes();
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }

  return (
    <RecipesPage response={response}/>
  );
}
