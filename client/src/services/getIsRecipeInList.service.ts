import { toast } from "react-toastify";

export const getIsRecipeInList = async (listId: string, recipeId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}/${listId}`
    );
    return await response.json();
  } catch (error) {
    toast.error(
      `There has been an error while checking if the recipe is in the list`,
      { theme: "dark" }
    );
  }
};
