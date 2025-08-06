import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "@/components/animate-ui/icons/trash";

import type { IngredientInRecipeForm } from "@/types/ingredient.types";

type IngredientRowProps = {
  index: number;
  ingredient: IngredientInRecipeForm;
  existingIngredients: IngredientInRecipeForm[];
  updateIngredient: (
    index: number,
    key: keyof IngredientInRecipeForm,
    value: string | number
  ) => void;
  removeIngredient: (index: number) => void;
};

export default function IngredientRow({
  index,
  ingredient,
  existingIngredients,
  updateIngredient,
  removeIngredient,
}: IngredientRowProps) {
  return (
    <tr>
      <td className="w-1/2">
        {!ingredient.isNew ? (
          <Select
            defaultValue={ingredient.id}
            onValueChange={(value: string) =>
              updateIngredient(index, "id", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir" />
            </SelectTrigger>
            <SelectContent>
              {existingIngredients.map((ing) => (
                <SelectItem key={ing.id} value={ing.id}>
                  {ing.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            placeholder="Nom"
            value={ingredient.name}
            onChange={(e) => updateIngredient(index, "name", e.target.value)}
          />
        )}
      </td>

      <td className="w-1/6">
        <Input
          type="number"
          step="any"
          placeholder="Quantité"
          value={ingredient.quantity}
          onChange={(e) =>
            updateIngredient(index, "quantity", Number(e.target.value))
          }
        />
      </td>

      <td className="w-1/4">
        {ingredient.isNew ? (
          <Input
            placeholder="Unité"
            value={ingredient.unit}
            onChange={(e) => updateIngredient(index, "unit", e.target.value)}
          />
        ) : (
          <p className="flex items-center px-3 text-white">{ingredient.unit}</p>
        )}
      </td>

      <td>
        <Button
          variant="ghost"
          type="button"
          onClick={() => removeIngredient(index)}
        >
          <Trash />
        </Button>
      </td>
    </tr>
  );
}
