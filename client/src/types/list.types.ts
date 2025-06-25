import type { IngredientWithQuantity } from "./ingredient.types";
import type { RecipeDetails } from "./recipe.types";

export type List = {
  id: string;
  recipes: RecipeDetails[];
  ingredients: IngredientWithQuantity[];
};
