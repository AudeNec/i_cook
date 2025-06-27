import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listIngredientRepository = {
  create: (listId: number, ingredientId: number) => {
    return prisma.list_ingredient.create({
      data: {
        listId,
        ingredientId,
        bought: false,
      },
    });
  },

  delete: (listId: number, ingredientId: number) => {
    return prisma.list_ingredient.delete({
      where: {
        listId_ingredientId: {
          listId,
          ingredientId,
        },
      },
    });
  },

  update: (listId: number, ingredientId: number, bought: boolean) => {
    return prisma.list_ingredient.update({
      where: {
        listId_ingredientId: {
          listId,
          ingredientId,
        },
      },
      data: { bought },
    });
  },
};
