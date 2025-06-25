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
