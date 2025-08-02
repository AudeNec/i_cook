/*
  Warnings:

  - You are about to drop the column `convertible` on the `ingredient` table. All the data in the column will be lost.
  - You are about to drop the `unit_conversion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unit` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingredient` DROP COLUMN `convertible`,
    ADD COLUMN `unit` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `unit_conversion`;
