import type { Ingredient } from "./ingredient.types";
import type { Recipe } from "./recipe.types";

export type List = {
  id: string;
  recipes: Recipe[];
  ingredients: Ingredient[];
};
