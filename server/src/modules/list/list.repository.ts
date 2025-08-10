import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listRepository = {
  read: async (listId: number) => {
    return await prisma.list.findUnique({
      where: { id: listId },
      include: {
        ingredients: {
          include: {
            ingredient: true,
            recipeIngredients: {
              include: {
                recipeIngredient: {
                  include: {
                    recipe: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },

  readCurrentId: async () => {
    const currentList = await prisma.list.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return currentList ? currentList.id : null;
  },

  readCurrent: async () => {
    return await prisma.list.findFirst({
      orderBy: { createdAt: "desc" },
      include: {
        ingredients: {
          select: {
            ingredientId: true,
            listId: true,
            recipeIngredients: {
              select: {
                recipeId: true,
              },
            },
          },
        },
      },
    });
  },

  create: async () => {
    const newList = await prisma.list.create({
      data: {},
    });
    return newList.id;
  },

  addRecipeToList: async (listId: number, recipeId: number) => {
    const recipeIngredients = await prisma.recipe_ingredient.findMany({
      where: { recipeId },
    });

    for (const recipeIngredient of recipeIngredients) {
      await prisma.list_ingredient.upsert({
        where: {
          listId_ingredientId: {
            listId,
            ingredientId: recipeIngredient.ingredientId,
          },
        },
        update: {},
        create: {
          listId,
          ingredientId: recipeIngredient.ingredientId,
        },
      });

      await prisma.list_Recipe_Ingredient.upsert({
        where: {
          listId_ingredientId_recipeId_recipeIngredientId: {
            listId,
            ingredientId: recipeIngredient.ingredientId,
            recipeId,
            recipeIngredientId: recipeIngredient.ingredientId,
          },
        },
        update: {},
        create: {
          listId,
          ingredientId: recipeIngredient.ingredientId,
          recipeId,
          recipeIngredientId: recipeIngredient.ingredientId,
        },
      });
    }

    return await prisma.list.findUnique({
      where: { id: listId },
    });
  },

  removeRecipeFromList: async (listId: number, recipeId: number) => {
    await prisma.list_Recipe_Ingredient.deleteMany({
      where: {
        listId,
        recipeId,
      },
    });

    const orphanedIngredients = await prisma.list_ingredient.findMany({
      where: {
        listId,
        recipeIngredients: {
          none: {},
        },
      },
    });

    if (orphanedIngredients.length > 0) {
      await prisma.list_ingredient.deleteMany({
        where: {
          listId,
          ingredientId: {
            in: orphanedIngredients.map((ing) => ing.ingredientId),
          },
        },
      });
    }

    return await prisma.list.findUnique({
      where: { id: listId },
    });
  },

  isRecipeInList: async (recipeId: number, listId: number) => {
    const junctionRecords = await prisma.list_Recipe_Ingredient.findMany({
      where: {
        listId,
        recipeId,
      },
    });
    return junctionRecords.length > 0;
  },
};
