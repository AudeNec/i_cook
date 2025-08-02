/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unit]` on the table `Unit_Conversion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `list_ingredient` MODIFY `bought` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `unit_conversion` MODIFY `type` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Ingredient_name_key` ON `Ingredient`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Recipe_name_key` ON `Recipe`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Unit_Conversion_unit_key` ON `Unit_Conversion`(`unit`);
