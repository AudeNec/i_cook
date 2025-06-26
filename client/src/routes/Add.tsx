import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import type { NewRecipe } from "../types/recipe.types";
import { addRecipe } from "../services/addRecipe.service";

export const Add = () => {
  const { register, control, handleSubmit, watch } = useForm<NewRecipe>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = (data: NewRecipe) => {
    console.log("Submitting:", data);
    addRecipe(data);
  };

  console.log("render");

  const [existingIngredients, setExistingIngredients] = useState<
    {
      unit: number;
      id: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ingredients`
      );
      const data = await response.json();
      setExistingIngredients(data);
    };
    fetchIngredients();
  }, []);

  const watchIngredients = useWatch({
    control,
    name: "ingredients",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Nom de la recette"
        {...register("name", { required: true })}
      />

      <h3>Ingrédients</h3>
      {fields.map((field, index) => {
        const selectedId = watchIngredients?.[index]?.id;
        const isNew = selectedId === "new";
        const existing = existingIngredients.find((i) => i.id === selectedId);

        return (
          <div
            key={field.id}
            style={{
              border: "1px solid #ccc",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            <label>Ingrédient :</label>
            <select {...register(`ingredients.${index}.id`)}>
              <option value="">-- Choisir --</option>
              {existingIngredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name}
                </option>
              ))}
              <option value="new">➕ Ajouter un nouvel ingrédient</option>
            </select>

            {isNew && (
              <input
                placeholder="Nom du nouvel ingrédient"
                {...register(`ingredients.${index}.name`, { required: true })}
              />
            )}

            <input
              placeholder="Quantité"
              type="number"
              step="any"
              {...register(`ingredients.${index}.quantity`, {
                required: true,
                valueAsNumber: true,
              })}
            />

            {isNew ? (
              <input
                placeholder="Unité (ex: g, ml...)"
                {...register(`ingredients.${index}.unit`, { required: true })}
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
              🗑 Supprimer
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => append({ unit: "", quantity: 1, name: "" })}
      >
        ➕ Ajouter un ingrédient
      </button>

      <input type="submit" value="Enregistrer la recette" />
    </form>
  );
};
