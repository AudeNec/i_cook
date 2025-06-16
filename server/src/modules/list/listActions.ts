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
        recipes: true,
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

    const ingredients = list.ingredients.map(({ ingredient, bought }) => ({
      ingredientId: ingredient.id,
      name: ingredient.name,
      bought,
    }));

    res.status(200).json({
      listId: list.id,
      recipes: list.recipes,
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
  console.log("Change recipe handler called");
  try {
    const { id } = req.params;
    const recipeId = parseInt(id);

    const listWithRecipes = await prisma.list.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        recipes: {
          select: { id: true },
        },
      },
    });

    if (!listWithRecipes) {
      res.status(404).json({ error: "List not found." });
      return;
    }

    const isInList = listWithRecipes.recipes.some((r) => r.id === recipeId);

    await prisma.list.update({
      where: { id: listWithRecipes.id },
      data: {
        recipes: isInList
          ? { disconnect: { id: recipeId } }
          : { connect: { id: recipeId } },
      },
    });
    console.log("Sending response with message...");
    res.status(200).json({
      message: isInList ? "Recipe removed from list." : "Recipe added to list.",
    });
    return;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the list." });
  }
};

export default { read, findCurrent, add, changeRecipe };
