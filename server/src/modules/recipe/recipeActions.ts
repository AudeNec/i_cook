import type { RequestHandler } from "express";

import { recipeRepository } from "./recipeRepo";
import { IngredientRepository } from "../ingredient/ingredientRepo";
import { recipeIngredientRepository } from "../recipe_ingredient/recipeIngredientRepo";
import { listRepository } from "../list/listRepo";

const browse: RequestHandler = async (_req, res) => {
  try {
    const recipes = await recipeRepository.readAll();
    res.status(200).json(recipes);
  } catch {
    () => {
      res
        .status(500)
        .json({ error: "An error occurred while fetching recipes." });
    };
  }
};

const read: RequestHandler = async (req, res) => {
  try {
    const recipe = await recipeRepository.readById(Number(req.params.id));
    res.status(200).json(recipe);
  } catch {
    () => {
      res
        .status(500)
        .json({ error: "An error occurred while fetching recipe details." });
    };
  }
};

const add: RequestHandler = async (req, res) => {
  try {
    const { name, ingredients } = req.body;
    const newRecipe = await recipeRepository.create(name);

    console.log("New recipe created:", newRecipe);

    let ingredientsWithIds;

    console.log("Ingredients received:", ingredients);
    try {
      ingredientsWithIds = await Promise.all(
        ingredients.map(async (ingredient: any) => {
          if (ingredient.id === "new") {
            const newIngredient = await IngredientRepository.create(
              ingredient.name,
              ingredient.unit
            );
            return { ...newIngredient, quantity: ingredient.quantity };
          } else {
            const existing = await IngredientRepository.readById(
              Number(ingredient.id)
            );
            if (!existing) {
              throw new Error(
                `Ingrédient avec id ${ingredient.id} introuvable.`
              );
            }
            return { ...existing, quantity: ingredient.quantity };
          }
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erreur lors du traitement des ingrédients.",
      });
      return;
    }

    console.log("Ingredients with IDs:", ingredientsWithIds);

    for (const ingredient of ingredientsWithIds) {
      await recipeIngredientRepository.create(
        newRecipe.id,
        ingredient.id,
        ingredient.quantity
      );
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the recipe." });
  }
};

const isInList: RequestHandler = async (req, res) => {
  const { recipeId, listId } = req.params;
  try {
    const isInList = await listRepository.isRecipeInList(
      Number(recipeId),
      Number(listId)
    );
    res.status(200).json({ isInList });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while checking if the recipe is in the list.",
    });
  }
};

export default {
  browse,
  read,
  add,
  isInList,
};
