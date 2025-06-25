import type { Month } from "./month.types";

export interface Ingredient {
  id: number;
  name: string;
  season?: Month[];
}

export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
  unit: string;
  bought: boolean;
}
