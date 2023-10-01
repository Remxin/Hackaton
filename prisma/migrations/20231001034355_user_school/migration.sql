/*
  Warnings:

  - Added the required column `school` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `StudyPath` DROP FOREIGN KEY `StudyPath_categoryId_fkey`;

-- AlterTable
ALTER TABLE `StudyPath` MODIFY `categoryId` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `school` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `StudyPath` ADD CONSTRAINT `StudyPath_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
