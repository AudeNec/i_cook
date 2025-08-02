export const createList = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lists`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Erreur lors de la création de la nouvelle liste");
    }
    const newListId: number = await response.json();
    return newListId;
  } catch (error) {
    console.error("Erreur:", error);
  }
};

export const fetchList = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/lists/search/${id}`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de la liste");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur:", error);
  }
};

export const getIsRecipeInList = async (listId: string, recipeId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/recipes/${recipeId}/${listId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
  }
};

export const changeRecipeInList = async (recipeId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/lists/recipes/${recipeId}`,
      { method: "PUT" }
    );
    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
  }
};
