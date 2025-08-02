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
      throw new Error("Failed to update ingredient bought status");
    }

    return await res.json();
  } catch (err) {
    console.error("fetch error:", err);
    throw err;
  }
};

export const fetchIngredients = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ingredients`);

    if (!res.ok) {
      throw new Error("Failed to fetch ingredients");
    }

    return await res.json();
  } catch (err) {
    console.error("fetch error:", err);
    throw err;
  }
};
