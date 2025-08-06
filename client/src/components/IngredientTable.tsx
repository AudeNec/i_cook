import { Table, TableBody } from "@/components/ui/table";

import IngredientRow from "@/components/IngredientRow";

import type { IngredientInRecipeForm } from "@/types/ingredient.types";

type IngredientsTableProps = {
  recipeIngredients: IngredientInRecipeForm[];
  existingIngredients: IngredientInRecipeForm[];
  updateIngredient: (
    index: number,
    key: keyof IngredientInRecipeForm,
    value: string | number
  ) => void;
  removeIngredient: (index: number) => void;
};

export default function IngredientsTable({
  recipeIngredients,
  existingIngredients,
  updateIngredient,
  removeIngredient,
}: IngredientsTableProps) {
  return (
    <Table>
      <TableBody>
        {recipeIngredients.map((ingredient, index) => (
          <IngredientRow
            key={index}
            index={index}
            ingredient={ingredient}
            existingIngredients={existingIngredients}
            updateIngredient={updateIngredient}
            removeIngredient={removeIngredient}
          />
        ))}
      </TableBody>
    </Table>
  );
}
