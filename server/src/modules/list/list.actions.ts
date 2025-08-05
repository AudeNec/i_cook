import type { RequestHandler } from "express";

import { listRepository } from "./list.repository";
import { recipeIngredientRepository } from "../recipe_ingredient/recipeIngredient.repository";
import { AggregatesRepository } from "../aggregates/aggregate.repository";
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

    const ingredientsWithQuantity = list.ingredients.map((ingredient) => ({
      name: ingredient.ingredient.name,
      id: ingredient.ingredientId,
      bought: ingredient.bought,
      quantity: list.recipes
        .filter(({ ingredients }) =>
          ingredients.some((i) => i.ingredientId === ingredient.ingredientId)
        )
        .reduce((total, recipe) => {
          const recipeIngredient = recipe.ingredients.find(
            (i) => i.ingredientId === ingredient.ingredientId
          );
          return total + (recipeIngredient?.quantity || 0);
        }, 0),
      unit: ingredient.ingredient.unit,
    }));

    res.status(200).json({
      listId: list.id,
      recipes: list.recipes.map((recipe) => ({
        ...recipe,
        ingredients: recipe.ingredients.flatMap((ingredient) => ({
          name: ingredient.ingredient.name,
          id: ingredient.ingredientId,
          quantity: ingredient.quantity,
          unit: ingredient.ingredient.unit,
        })),
      })),
      ingredients: ingredientsWithQuantity,
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
    const [recipeIngredients, list] = await Promise.all([
      recipeIngredientRepository.readByRecipeId(recipeId),
      listRepository.readCurrent(),
    ]);

    if (!list) {
      res.status(404).json({ error: "List not found." });
      return;
    }

    const isInList = list.recipes.some((r) => r.id === recipeId);
    const listId = list.id;
    const recipeIngredientIds = recipeIngredients.map((ri) => ri.ingredientId);

    if (isInList) {
      const otherUsages = await recipeIngredientRepository.readOtherUsages(
        recipeIngredientIds,
        recipeId,
        listId
      );

      const stillUsedIds = new Set(otherUsages.map((ri) => ri.ingredientId));
      const toRemove = recipeIngredientIds.filter(
        (id) => !stillUsedIds.has(id)
      );

      await AggregatesRepository.updateList(
        "delete",
        listId,
        recipeId,
        toRemove
      );

      res.status(200).json({ message: "Recipe removed from list." });
    } else {
      const existingIngredientIds = new Set(
        list.ingredients.map((i) => i.ingredientId)
      );

      const toAdd = recipeIngredientIds.filter(
        (id) => !existingIngredientIds.has(id)
      );

      await AggregatesRepository.updateList("add", listId, recipeId, toAdd);

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
