import { useEffect, useState } from "react";

import { fetchIngredients } from "@/services/ingredient.services";

import type { IngredientInRecipeForm } from "@/types/ingredient.types";

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<IngredientInRecipeForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const data = await fetchIngredients();
        setIngredients(data);
      } catch (err) {
        setError("Erreur lors du chargement des ingrédients.");
      } finally {
        setLoading(false);
      }
    };

    loadIngredients();
  }, []);

  return { ingredients, loading, error };
};
