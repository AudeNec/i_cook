import { PrismaClient } from "@prisma/client";
import { listRepository } from "../list/listRepo";
import { listIngredientRepository } from "../list_ingredient/listIngredientRepo";

const prisma = new PrismaClient();

export const AggregatesRepository = {
  updateList: async (
    action: "add" | "delete",
    listId: number,
    recipeId: number,
    ingredientIds: number[]
  ) => {
    return await prisma.$transaction([
      listRepository.update(action, listId, recipeId),
      ...ingredientIds?.map((ingredientId) =>
        action === "delete"
          ? listIngredientRepository.delete(listId, ingredientId)
          : listIngredientRepository.create(listId, ingredientId)
      ),
    ]);
  },
};
