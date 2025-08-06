import { useState } from "react";

import { useFormHandle } from "@/hooks/useFormHandle";
import { useIngredients } from "@/hooks/useIngredients";

import { Button } from "@/components/ui/button";

import AddIngredientButtons from "@/components/AddIngredientButtons";
import ErrorPage from "@/components/ErrorPage";
import Header from "@/components/Header";
import IngredientsTable from "@/components/IngredientTable";
import RecipeNameInput from "@/components/RecipeNameInput";

import type { IngredientInRecipeForm } from "@/types/ingredient.types";

export const NewRecipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState<
    IngredientInRecipeForm[]
  >([]);

  const { ingredients: existingIngredients, loading, error } = useIngredients();

  const { addIngredient, removeIngredient, updateIngredient, handleSubmit } =
    useFormHandle({
      recipeIngredients,
      setRecipeIngredients,
      existingIngredients,
      recipeName,
      setRecipeName,
    });

  if (loading) return <p className="text-center text-white">Chargement...</p>;
  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <Header title="Nouvelle recette" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 pb-24">
        <RecipeNameInput value={recipeName} onChange={setRecipeName} />
        <h3 className="text-white text-center">Liste des ingrédients</h3>

        <IngredientsTable
          recipeIngredients={recipeIngredients}
          existingIngredients={existingIngredients}
          updateIngredient={updateIngredient}
          removeIngredient={removeIngredient}
        />

        <AddIngredientButtons addIngredient={addIngredient} />

        <Button
          type="submit"
          className="bg-primary hover:bg-secondary-dark m-4"
        >
          Enregistrer
        </Button>
      </form>
    </>
  );
};
