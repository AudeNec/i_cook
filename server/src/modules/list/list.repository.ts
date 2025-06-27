import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listRepository = {
  read: async (listId: number) => {
    return await prisma.list.findUnique({
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
        recipes: { select: { id: true } },
        ingredients: { select: { ingredientId: true } },
      },
    });
  },

  create: async () => {
    const newList = await prisma.list.create({
      data: {},
    });
    return newList.id;
  },

  update: (action: "add" | "delete", listId: number, recipeId: number) => {
    return prisma.list.update({
      where: { id: listId },
      data: {
        recipes:
          action === "delete"
            ? { disconnect: { id: recipeId } }
            : { connect: { id: recipeId } },
      },
    });
  },

  isRecipeInList: async (recipeId: number, listId: number) => {
    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: { recipes: true },
    });
    return list ? list.recipes.some((recipe) => recipe.id === recipeId) : false;
  }
};
