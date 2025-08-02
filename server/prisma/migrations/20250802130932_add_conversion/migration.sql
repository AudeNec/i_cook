/*
  Warnings:

  - You are about to drop the column `unit` on the `ingredient` table. All the data in the column will be lost.
  - Added the required column `convertible` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingredient` DROP COLUMN `unit`,
    ADD COLUMN `convertible` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `Unit_Conversion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(191) NOT NULL,
    `conversion` DOUBLE NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
