import { PrismaClient } from "@prisma/client";
import { listRepository } from "../list/list.repository";
import { listIngredientRepository } from "../list_ingredient/listIngredient.repository";

const prisma = new PrismaClient();

interface AggregateRepositoryInterface {
  updateList(
    action: "add" | "delete",
    listId: number,
    recipeId: number,
    ingredientIds: number[]
  ): Promise<void>;
}

export default class AggregateRepository
  implements AggregateRepositoryInterface
{
  async updateList(
    action: "add" | "delete",
    listId: number,
    recipeId: number,
    ingredientIds: number[]
  ): Promise<void> {
    await prisma.$transaction([
      listRepository.update(action, listId, recipeId),
      ...ingredientIds?.map((ingredientId) =>
        action === "delete"
          ? listIngredientRepository.delete(listId, ingredientId)
          : listIngredientRepository.create(listId, ingredientId)
      ),
    ]);
  }
}
