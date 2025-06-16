import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Recipe } from "../types/recipe.types";
import { useCurrentList } from "../context/ListContext";
import { fetchList } from "../services/getList.service";
import type { List } from "../types/list.types";

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { currentListId } = useCurrentList();
  const [currentList, setList] = useState<List | null>(null);

  if (!currentListId) {
    return (
      <div>
        <p>Loading current list...</p>
      </div>
    );
  }

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

  useEffect(() => {
    const getList = async () => {
      try {
        const data = await fetchList(currentListId);
        if (!data) {
          throw new Error("Liste introuvable");
        }
        setList(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération de la liste:" + error);
      }
    };
    getList();
  }, [currentListId]);

  const changeInList = async (recipeId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lists/recipes/${recipeId}`,
        { method: "PUT" }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const message = await response.json();
      toast.success(message, { theme: "dark" });
    } catch (error) {
      toast.error(
        `There has been an error while changing the recipe in the list`,
        { theme: "dark" }
      );
    }
  };

  return (
    <>
      <header>
        <h1>Recettes</h1>
      </header>
      <section>
        {recipes.map((recipe) => {
          return (
            <article>
              <h2>{recipe.name}</h2>
              <button>Voir plus</button>
              <button type="button" onClick={() => changeInList(recipe.id)}>
                {currentList && recipe.id in currentList.recipes
                  ? "Retirer de la liste"
                  : "Ajouter à la liste"}
              </button>
            </article>
          );
        })}
      </section>
    </>
  );
};
