-- DropForeignKey
ALTER TABLE `StudyPath` DROP FOREIGN KEY `StudyPath_categoryId_fkey`;

-- AddForeignKey
ALTER TABLE `StudyPath` ADD CONSTRAINT `StudyPath_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
