import type { Month } from "./month.types";

export interface Ingredient {
  id?: number | string;
  name: string;
  season?: Month[];
}

export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
  unit: string;
  bought?: boolean;
}

export interface NewIngredient {
  name: string;
  unit: string;
  season?: Month[];
}
