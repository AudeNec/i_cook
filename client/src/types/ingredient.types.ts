import type { Month } from "./month.types";

export interface Ingredient {
  id: string;
  name: string;
  season?: Month[];
}

export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
  unit: string;
}
