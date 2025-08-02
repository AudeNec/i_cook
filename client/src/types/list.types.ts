import type { IngredientWithQuantity } from "@/types/ingredient.types";
import type { RecipeDetails } from "@/types/recipe.types";

export type List = {
  id: string;
  recipes: RecipeDetails[];
  ingredients: IngredientWithQuantity[];
};
