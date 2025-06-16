-- CreateTable
CREATE TABLE `List_ingredient` (
    `listId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,
    `bought` BOOLEAN NOT NULL,

    PRIMARY KEY (`listId`, `ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List_ingredient` ADD CONSTRAINT `List_ingredient_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_ingredient` ADD CONSTRAINT `List_ingredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
