import type { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const read: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const listId = parseInt(id);
  try {
    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: {
        recipes: {
          include: {
            ingredients: {
              include: {
                ingredient: true,
              },
            },
          },
        },
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    if (!list) {
      res.status(404).json({ error: "No list found." });
      return;
    }

    const ingredientsWithQuantity = list.ingredients.map((ingredient) => ({
      name: ingredient.ingredient.name,
      unit: ingredient.ingredient.unit,
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
    }));

    res.status(200).json({
      listId: list.id,
      recipes: list.recipes.map((recipe) => ({
        ...recipe,
        ingredients: recipe.ingredients.flatMap((ingredient) => ({
          name: ingredient.ingredient.name,
          unit: ingredient.ingredient.unit,
          id: ingredient.ingredientId,
          quantity: ingredient.quantity,
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
    const currentList = await prisma.list.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!currentList) {
      res.status(404).json({ error: "No current list found." });
      return;
    }

    res.status(200).json({
      id: currentList.id,
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
    const newList = await prisma.list.create({
      data: {},
    });
    res.status(201).json(newList.id);
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
      prisma.recipe_ingredient.findMany({
        where: { recipeId },
        select: { ingredientId: true },
      }),
      prisma.list.findFirst({
        orderBy: { createdAt: "desc" },
        include: {
          recipes: { select: { id: true } },
          ingredients: { select: { ingredientId: true } },
        },
      }),
    ]);

    if (!list) {
      res.status(404).json({ error: "List not found." });
      return;
    }

    const isInList = list.recipes.some((r) => r.id === recipeId);
    const listId = list.id;
    const recipeIngredientIds = recipeIngredients.map((ri) => ri.ingredientId);

    if (isInList) {
      const otherUsages = await prisma.recipe_ingredient.findMany({
        where: {
          ingredientId: { in: recipeIngredientIds },
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

      const stillUsedIds = new Set(otherUsages.map((ri) => ri.ingredientId));
      const toRemove = recipeIngredientIds.filter(
        (id) => !stillUsedIds.has(id)
      );

      await prisma.$transaction([
        prisma.list.update({
          where: { id: listId },
          data: {
            recipes: { disconnect: { id: recipeId } },
          },
        }),
        ...toRemove?.map((ingredientId) =>
          prisma.list_ingredient.delete({
            where: {
              listId_ingredientId: {
                listId,
                ingredientId,
              },
            },
          })
        ),
      ]);

      res.status(200).json({ message: "Recipe removed from list." });
    } else {
      const existingIngredientIds = new Set(
        list.ingredients.map((i) => i.ingredientId)
      );

      const toAdd = recipeIngredientIds.filter(
        (id) => !existingIngredientIds.has(id)
      );

      await prisma.$transaction([
        prisma.list.update({
          where: { id: listId },
          data: {
            recipes: { connect: { id: recipeId } },
          },
        }),
        ...toAdd.map((ingredientId) =>
          prisma.list_ingredient.create({
            data: {
              listId,
              ingredientId,
              bought: false,
            },
          })
        ),
      ]);

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
    const updatedIngredient = await prisma.list_ingredient.update({
      where: {
        listId_ingredientId: {
          listId: parseInt(listId),
          ingredientId: parseInt(ingredientId),
        },
      },
      data: { bought },
    });

    res.status(200).json(updatedIngredient);
  } catch (error) {
    console.error("Error in updateIngredientBought:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the ingredient." });
  }
};

export default { read, findCurrent, add, changeRecipe, updateIngredientBought };
