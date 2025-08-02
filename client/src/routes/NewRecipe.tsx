import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import type { NewRecipeType } from "@/types/recipe.types";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IngredientField } from "@/components/IngredientField";
import { toast } from "react-toastify";
import { addRecipe } from "@/services/recipe.services";

export const NewRecipe = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRecipeType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const watchIngredients = useWatch({ control, name: "ingredients" });

  const [existingIngredients, setExistingIngredients] = useState<
    { unit: string; id: string; name: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/ingredients`
        );
        if (!res.ok) throw new Error("Failed to fetch ingredients");
        const data = await res.json();
        setExistingIngredients(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des ingrédients.");
      }
    })();
  }, []);

  const onSubmit = async (data: NewRecipeType) => {
    try {
      await addRecipe(data);
      toast.success("Recette ajoutée avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la recette.");
    }
  };

  return (
    <>
      <Header title="Ajouter une recette" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pb-24"
      >
        <Input
          type="text"
          placeholder="Nom de la recette"
          {...register("name", {
            required: "Le nom de la recette est requis.",
          })}
          className="text-xl text-center font-subtitle mb-4 h-24 border-none"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <section className="bg-primary p-8 rounded-lg gap-4 flex flex-col">
          <h3 className="text-white text-center">Liste des ingrédients</h3>

          {fields.map((field, index) => (
            <IngredientField
              key={field.id}
              index={index}
              field={field}
              remove={remove}
              ingredients={existingIngredients}
              register={register}
              watch={watchIngredients}
            />
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                id: "new",
                unit: "",
                quantity: 1,
                name: "",
                bought: false,
              })
            }
            variant="secondary"
          >
            Ajouter un ingrédient
          </Button>
        </section>

        <Button type="submit" className="bg-secondary hover:bg-secondary-dark">
          Enregistrer
        </Button>
      </form>
    </>
  );
};
