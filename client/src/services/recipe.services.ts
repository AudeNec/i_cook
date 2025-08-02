import type { NewRecipeType } from "@/types/recipe.types";

export const getRecipeDetails = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/recipes/${id}`
    );
    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
  }
};

export const addRecipe = async (
  recipe: NewRecipeType
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/recipes/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
  }
};
