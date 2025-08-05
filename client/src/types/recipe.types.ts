import type {
  IngredientInChecklist,
  IngredientWithQuantity,
} from "@/types/ingredient.types";
import type { Month } from "@/types/month.types";

export type Recipe = {
  id: string;
  name: string;
};

export type RecipeDetails = {
  id: string;
  name: string;
  ingredients: IngredientInChecklist[];
  season: Month[];
};

export type NewRecipeType = {
  name: string;
  ingredients: Array<IngredientWithQuantity>;
};
