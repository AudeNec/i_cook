/*
  Warnings:

  - You are about to drop the `_listrecipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_listrecipes` DROP FOREIGN KEY `_ListRecipes_A_fkey`;

-- DropForeignKey
ALTER TABLE `_listrecipes` DROP FOREIGN KEY `_ListRecipes_B_fkey`;

-- DropTable
DROP TABLE `_listrecipes`;

-- CreateTable
CREATE TABLE `List_Recipe_Ingredient` (
    `listId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,
    `recipeId` INTEGER NOT NULL,
    `recipeIngredientId` INTEGER NOT NULL,

    PRIMARY KEY (`listId`, `ingredientId`, `recipeId`, `recipeIngredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List_Recipe_Ingredient` ADD CONSTRAINT `List_Recipe_Ingredient_listId_ingredientId_fkey` FOREIGN KEY (`listId`, `ingredientId`) REFERENCES `List_ingredient`(`listId`, `ingredientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_Recipe_Ingredient` ADD CONSTRAINT `List_Recipe_Ingredient_recipeId_recipeIngredientId_fkey` FOREIGN KEY (`recipeId`, `recipeIngredientId`) REFERENCES `Recipe_ingredient`(`recipeId`, `ingredientId`) ON DELETE RESTRICT ON UPDATE CASCADE;
