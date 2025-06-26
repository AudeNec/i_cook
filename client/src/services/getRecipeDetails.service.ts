import { toast } from "react-toastify";

export const getRecipeDetails = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/recipes/${id}`
    );
    return await response.json();
  } catch (error) {
    toast.error("Error: Unable to load recipe details.", { theme: "dark" });
  }
};
