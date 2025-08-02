import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Recipe } from "@/types/recipe.types";
import { Header } from "@/components/Header";
import { RecipeCard } from "@/components/RecipeCard";

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/recipes"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const recipes = await response.json();
      setRecipes(recipes);
    } catch (error) {
      toast.error(`There has been to get recipes`, { theme: "dark" });
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Header title="Recettes" />
      <section className="flex flex-col items-stretch justify-start">
        {recipes.map((recipe) => {
          return (
            <RecipeCard key={recipe.id} id={recipe.id} name={recipe.name} />
          );
        })}
      </section>
    </>
  );
};
