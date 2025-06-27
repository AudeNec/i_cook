import { PrismaClient } from "@prisma/client";
import { create } from "domain";
import { read } from "fs";

const prisma = new PrismaClient();

export const recipeIngredientRepository = {
  readByRecipeId: async (recipeId: number) => {
    return await prisma.recipe_ingredient.findMany({
      where: { recipeId },
      select: { ingredientId: true },
    });
  },

  create: async (
    recipeId: number,
    ingredientId: number,
    quantity: number
  ) => {
    return await prisma.recipe_ingredient.create({
      data: {
        recipeId,
        ingredientId,
        quantity,
      },
    });
  },

  readOtherUsages: async (
    ingredientIds: number[],
    recipeId: number,
    listId: number
  ) => {
    return await await prisma.recipe_ingredient.findMany({
      where: {
        ingredientId: { in: ingredientIds },
        recipe: {
          lists: {
            some: {
              id: listId,
              NOT: {
                recipes: {
                  some: { id: recipeId },
                },
              },
            },
          },
        },
      },
      select: { ingredientId: true },
    });
  },
};
