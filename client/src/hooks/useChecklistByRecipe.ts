import type { IngredientInChecklist } from "@/types/ingredient.types";

export const useChecklistByRecipe = (ingredients: IngredientInChecklist[]) => {
  return ingredients.reduce((acc, ingredient) => {
    ingredient.recipes?.forEach((ri) => {
      const recipeId = ri.recipeId;
      if (acc.find((r) => r.id === recipeId) === undefined) {
        acc.push({
          id: recipeId,
          name: ri.recipeName,
          ingredients: [],
        });
      }
      acc
        .find((r) => r.id === recipeId)!
        .ingredients.push({
          id: ingredient.id,
          name: ingredient.name,
          unit: ingredient.unit,
          bought: ingredient.bought,
          quantity: ri.ingredientQuantity,
        });
    });
    return acc;
  }, [] as { id: number; name: string; ingredients: IngredientInChecklist[] }[]);
};
