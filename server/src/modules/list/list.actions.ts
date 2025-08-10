import type { RequestHandler } from "express";

import { listRepository } from "./list.repository";
import { listIngredientRepository } from "../list_ingredient/listIngredient.repository";

const read: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const listId = parseInt(id);
  try {
    const list = await listRepository.read(listId);

    if (!list) {
      res.status(404).json({ error: "No list found." });
      return;
    }

    const ingredients = list.ingredients.map((ingredient) => {
      const recipes = ingredient.recipeIngredients.map((ri) => ({
        recipeId: ri.recipeIngredient.recipe.id,
        recipeName: ri.recipeIngredient.recipe.name,
        ingredientQuantity: ri.recipeIngredient.quantity,
      }));

      const quantity = recipes.reduce(
        (total, recipe) => total + recipe.ingredientQuantity,
        0
      );

      return {
        id: ingredient.ingredientId,
        name: ingredient.ingredient.name,
        unit: ingredient.ingredient.unit,
        bought: ingredient.bought,
        quantity,
        recipes,
      };
    });

    res.status(200).json({
      listId: list.id,
      ingredients,
    });
  } catch (error) {
    console.error("Error in read:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the list." });
  }
};

const findCurrent: RequestHandler = async (_req, res) => {
  try {
    const currentListId = await listRepository.readCurrentId();

    if (!currentListId) {
      res.status(404).json({ error: "No current list found." });
      return;
    }

    res.status(200).json({
      id: currentListId,
    });
  } catch (error) {
    console.error("Error in readCurrent:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the current list." });
  }
};

const add: RequestHandler = async (_req, res) => {
  try {
    const newListId = await listRepository.create();
    res.status(201).json(newListId);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the list." });
  }
};

const changeRecipe: RequestHandler = async (req, res) => {
  const recipeId = parseInt(req.params.id);

  try {
    const list = await listRepository.readCurrent();

    if (!list) {
      res.status(404).json({ error: "List not found." });
      return;
    }

    const listId = list.id;
    const isInList = await listRepository.isRecipeInList(recipeId, listId);

    if (isInList) {
      await listRepository.removeRecipeFromList(listId, recipeId);
      res.status(200).json({ message: "Recipe removed from list." });
    } else {
      await listRepository.addRecipeToList(listId, recipeId);
      res.status(200).json({ message: "Recipe added to list." });
    }
  } catch (error) {
    console.error("Error in changeRecipe:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the list." });
  }
};

const updateIngredientBought: RequestHandler = async (req, res) => {
  const { listId, ingredientId } = req.params;
  const bought = req.body.bought;

  try {
    const updatedIngredient = await listIngredientRepository.update(
      parseInt(listId),
      parseInt(ingredientId),
      bought
    );

    res.status(200).json(updatedIngredient);
  } catch (error) {
    console.error("Error in updateIngredientBought:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the ingredient." });
  }
};

export default { read, findCurrent, add, changeRecipe, updateIngredientBought };
