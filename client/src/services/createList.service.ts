export const addList = async (): Promise<number | undefined> => {
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
