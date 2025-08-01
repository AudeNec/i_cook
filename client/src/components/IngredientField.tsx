import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const IngredientField = ({
  index,
  field,
  remove,
  ingredients,
  register,
  watch,
}: any) => {
  const selectedId = watch?.[index]?.id;
  const isNew = selectedId === "new";
  const existing = ingredients.find(
    ({ id }: { id: number }) => id === parseInt(selectedId)
  );

  console.log({
    existing,
    selectedId,
    ingredients,
    find: ingredients.find((i: any) => i.id === selectedId),
  });

  return (
    <div key={field.id} className="m-4 flex justify-between gap-2">
      <select {...register(`ingredients.${index}.id`)}>
        {ingredients.map((ing: any) => (
          <option key={ing.id} value={ing.id}>
            {ing.name}
          </option>
        ))}
        <option value="new">Ajouter un ingrédient</option>
      </select>

      {isNew && (
        <Input
          placeholder="Nom"
          {...register(`ingredients.${index}.name`, { required: true })}
        />
      )}

      <Input
        type="number"
        step="any"
        placeholder="Quantité"
        {...register(`ingredients.${index}.quantity`, {
          required: true,
          valueAsNumber: true,
        })}
      />

      {isNew ? (
        <Input
          placeholder="Unité (g, ml...)"
          {...register(`ingredients.${index}.unit`, { required: true })}
        />
      ) : (
        <p>
          <strong>{existing?.unit}</strong>
        </p>
      )}

      <Button variant="ghost" type="button" onClick={() => remove(index)}>
        <Trash />
      </Button>
    </div>
  );
};
