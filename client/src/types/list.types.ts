import type { IngredientInChecklist } from "@/types/ingredient.types";
import type { RecipeDetails } from "@/types/recipe.types";

export type List = {
  id: number;
  recipes: RecipeDetails[];
  ingredients: IngredientInChecklist[];
};
