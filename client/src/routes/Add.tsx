import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import type { NewRecipe } from "../types/recipe.types";
import { addRecipe } from "../services/addRecipe.service";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "@/components/animate-ui/icons/trash";

export const Add = () => {
  const { register, control, handleSubmit } = useForm<NewRecipe>();

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
    <>
      <Header content="Ajouter une recette" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col content-right"
      >
        <Input
          type="text"
          placeholder="Nom de la recette"
          {...register("name", { required: true })}
          className="placeholder:text-xl text-center text-white font-subtitle text-xl mb-4 h-24 border-none"
        />

        <section className="flex flex-col content-center mb-4 bg-primary p-8 rounded-lg gap-4">
          <h3 className="text-white text-center pb-8">Liste des ingrédients</h3>
          {fields.map((field, index) => {
            const selectedId = watchIngredients?.[index]?.id;
            const isNew = selectedId === "new";
            const existing = existingIngredients.find(
              (i) => i.id === selectedId
            );

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
          })}

          <button
            type="button"
            onClick={() =>
              append({ id: "new", unit: "", quantity: 1, name: "" })
            }
          >
            Ajouter un ingrédient
          </button>
        </section>
        <Button
          type="submit"
          className="hover:text-white hover:bg-secondary-dark bg-secondary"
        >
          Enregistrer
        </Button>
      </form>
    </>
  );
};
