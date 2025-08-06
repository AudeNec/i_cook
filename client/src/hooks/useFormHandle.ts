import { toast } from "react-toastify";

import { addRecipe } from "@/services/recipe.services";

import type { IngredientInRecipeForm } from "@/types/ingredient.types";

interface useFormHandleProps {
  recipeIngredients: IngredientInRecipeForm[];
  setRecipeIngredients: React.Dispatch<
    React.SetStateAction<IngredientInRecipeForm[]>
  >;
  existingIngredients: IngredientInRecipeForm[];
  recipeName: string;
  setRecipeName: React.Dispatch<React.SetStateAction<string>>;
}

export const useFormHandle = ({
  recipeIngredients,
  setRecipeIngredients,
  existingIngredients,
  recipeName,
  setRecipeName,
}: useFormHandleProps) => {
  const addIngredient = ({ isNew }: { isNew: boolean }) => {
    setRecipeIngredients([
      ...recipeIngredients,
      {
        id: isNew ? "new" : "",
        name: "",
        quantity: 1,
        unit: "",
        isNew: isNew,
      },
    ]);
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const updated = [...recipeIngredients];
    updated[index] = { ...updated[index], [field]: value };

    if (field === "id" && !updated[index].isNew) {
      const existing = existingIngredients.find((ing) => ing.id === value);
      if (existing) {
        updated[index].unit = existing.unit;
        updated[index].name = existing.name;
      }
    }

    setRecipeIngredients(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Le nom de la recette est requis.");
      return;
    }

    if (recipeIngredients.length === 0) {
      toast.error("Au moins un ingrédient est requis.");
      return;
    }

    try {
      const recipeData = {
        name: recipeName,
        ingredients: recipeIngredients.map((ing) => ({
          id: ing.isNew ? "new" : ing.id,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          bought: false,
        })),
      };

      await addRecipe(recipeData);
      toast.success("Recette ajoutée avec succès !");

      // Reset form
      setRecipeName("");
      setRecipeIngredients([]);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la recette.");
    }
  };

  return { addIngredient, removeIngredient, updateIngredient, handleSubmit };
};
