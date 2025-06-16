import type { IngredientWithQuantity } from "./ingredient.types";
import type { Month } from "./month.types";

export type Recipe = {
  id: string;
  name: string;
};

export type RecipeDetails = {
  id: string;
  name: string;
  ingredients: IngredientWithQuantity[];
  season: Month[];
};
