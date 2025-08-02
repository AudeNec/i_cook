import type { Month } from "@/types/month.types";

export interface NewIngredient {
  name: string;
  unit: string;
  season?: Month[];
}

export interface Ingredient extends NewIngredient {
  id: string;
}

export interface NewIngredientWithQuantity extends NewIngredient {
  quantity: number;
  bought: boolean;
}

export type IngredientWithQuantity = Ingredient & NewIngredientWithQuantity;
