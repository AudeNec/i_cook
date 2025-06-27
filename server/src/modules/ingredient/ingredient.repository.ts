import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const IngredientRepository = {
  async readAll() {
    return await prisma.ingredient.findMany();
  },

  async create(name: string, unit: string) {
    return await prisma.ingredient.create({
      data: {
        name,
        unit,
      },
    });
  },

  readById : async (id: number) => {
    return await prisma.ingredient.findUnique({
      where: { id },
    });
  }
};
