import type { Month } from "@/types/month.types";

export type Ingredient = {
  id: string;
  name: string;
  unit: string;
  month?: Month[];
};

export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
}

export interface IngredientInRecipeForm extends IngredientWithQuantity {
  quantity: number;
  isNew: boolean;
}

export interface IngredientInChecklist extends IngredientWithQuantity {
  bought: boolean;
  quantity: number;
}
