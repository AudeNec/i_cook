import type { IngredientWithQuantity } from "@/types/ingredient.types";
import { Trash } from "./animate-ui/icons/trash";

type IngredientFormProps = {
  selectedId: string;
  isNew: boolean;
  existingIngredients: IngredientWithQuantity[];
  register: any;
  field: any;
  index: number;
  existing: IngredientWithQuantity;
};

export const IngredientForm = ({
  isNew,
  existingIngredients,
  register,
  field,
  index,
  existing,
}: IngredientFormProps) => {
  return (
    <div key={field.id} className="m-4 flex justify-between">
      <select {...register(`ingredients.${index}.id`)}>
        <option value="">Choisir un ingrédient</option>
        {existingIngredients.map((ing) => (
          <option key={ing.id} value={ing.id}>
            {ing.name}
          </option>
        ))}
        <option value="new" className="text-white text-xs underline">
          Ajouter un ingrédient
        </option>
      </select>

      {isNew && (
        <input
          placeholder="Nom du nouvel ingrédient"
          {...register(`ingredients.${index}.name`, {
            required: true,
          })}
        />
      )}

      <input
        placeholder="Quantité"
        step="any"
        {...register(`ingredients.${index}.quantity`, {
          required: true,
          valueAsNumber: true,
        })}
      />

      {isNew ? (
        <input
          placeholder="Unité (ex: g, ml...)"
          {...register(`ingredients.${index}.unit`, {
            required: true,
          })}
        />
      ) : existing ? (
        <div>
          <label>Unité :</label>
          <p>
            <strong>{existing.unit}</strong>
          </p>
          <input
            type="hidden"
            value={existing.unit}
            {...register(`ingredients.${index}.unit`)}
          />
        </div>
      ) : null}

      <button type="button" onClick={() => remove(index)}>
        <Trash />
      </button>
    </div>
  );
};
