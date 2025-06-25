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

    console.log("New recipe created:", newRecipe);

    let ingredientsWithIds;

    console.log("Ingredients received:", ingredients);
    try {
      ingredientsWithIds = await Promise.all(
        ingredients.map(async (ingredient: any) => {
          if (ingredient.id === "new") {
            const newIngredient = await prisma.ingredient.create({
              data: {
                name: ingredient.name,
                unit: ingredient.unit,
              },
            });
            return { ...newIngredient, quantity: ingredient.quantity };
          } else {
            const existing = await prisma.ingredient.findUnique({
              where: { id: Number(ingredient.id) },
            });
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
