import { PrismaClient } from "@prisma/client";
import { create } from "domain";
import { read } from "fs";

const prisma = new PrismaClient();

export const recipeRepository = {
  readAll: async () => {
    return await prisma.recipe.findMany();
  },

  readById: async (id: number) => {
    return await prisma.recipe.findUnique({
      where: { id },
    });
  },

  create: async (name: string) => {
    return await prisma.recipe.create({
      data: { name },
    });
  }

};
