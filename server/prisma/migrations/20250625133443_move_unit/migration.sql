/*
  Warnings:

  - You are about to drop the column `unit` on the `recipe_ingredient` table. All the data in the column will be lost.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingredient` ADD COLUMN `unit` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `recipe_ingredient` DROP COLUMN `unit`;
