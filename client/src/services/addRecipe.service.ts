import { toast } from "react-toastify";
import type { NewRecipe } from "../types/recipe.types";

export const addRecipe = async (recipe: NewRecipe) => {
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
    toast.error("Error: Unable to add recipe.", { theme: "dark" });
  }
};
