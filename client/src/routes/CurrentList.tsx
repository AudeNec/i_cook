import { useEffect, useState } from "react";
import { useCurrentList } from "../context/ListContext";
import { fetchList } from "../services/getList.service";
import { toast } from "react-toastify";
import type { IngredientWithQuantity } from "../types/ingredient.types";

type ListData = {
  listId: number;
  ingredients: IngredientWithQuantity[];
};

export const CurrentList = () => {
  const { currentListId } = useCurrentList();
  const [list, setList] = useState<ListData | null>(null);

  useEffect(() => {
    if (!currentListId) return;

    const getList = async () => {
      try {
        const data = await fetchList(currentListId);
        setList(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération de la liste");
      }
    };

    getList();
  }, [currentListId]);

  const handleToggle = async (ingredientId: number, currentBought: boolean) => {
    console.log(
      "Toggling ingredient:",
      ingredientId,
      "Current bought state:",
      currentBought
    );
    try {
      await updateIngredientBought(
        currentListId!,
        ingredientId,
        !currentBought
      );
      setList((prev) => {
        if (!prev) return prev;
        const newIngredients = prev.ingredients.map((ing) =>
          ing.id === ingredientId ? { ...ing, bought: !currentBought } : ing
        );
        return { ...prev, ingredients: newIngredients };
      });
    } catch (err) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  if (!list) return <p>Chargement...</p>;

  return (
    <section>
      <h1>Liste de courses</h1>
      {list.ingredients.map((ingredient) => {
        console.log(ingredient);
        return (
          <div key={ingredient.id}>
            <input
              type="checkbox"
              id={`ing-${ingredient.id}`}
              checked={ingredient.bought}
              onChange={() => handleToggle(ingredient.id, ingredient.bought)}
            />
            <label htmlFor={`ing-${ingredient.id}`}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </label>
          </div>
        );
      })}
    </section>
  );
};

const updateIngredientBought = async (
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
