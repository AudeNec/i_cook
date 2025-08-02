export const updateIngredientBought = async (
  listId: number,
  ingredientId: number,
  bought: boolean
) => {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/lists/${listId}/ingredients/${ingredientId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bought }),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || "Erreur inconnue");
    }

    return await res.json();
  } catch (err) {
    console.error("fetch error:", err);
    throw err;
  }
};