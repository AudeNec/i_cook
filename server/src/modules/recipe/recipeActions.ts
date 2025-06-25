import type { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const browse: RequestHandler = async (_req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();
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
    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(req.params.id) },
    });
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
    const newRecipe = await prisma.recipe.create({
      data: {
        name,
      },
    });
    for (const ingredient of ingredients) {
      await prisma.recipe_ingredient.create({
        data: {
          recipeId: newRecipe.id,
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
        },
      });
    }

    res.status(201).json(newRecipe);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the recipe." });
  }
};

export default {
  browse,
  read,
  add,
};
