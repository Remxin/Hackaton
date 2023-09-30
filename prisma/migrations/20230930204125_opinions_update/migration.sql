/*
  Warnings:

  - Added the required column `universityId` to the `StudyPathOpinion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StudyPathOpinion` ADD COLUMN `universityId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `StudyPathOpinion` ADD CONSTRAINT `StudyPathOpinion_universityId_fkey` FOREIGN KEY (`universityId`) REFERENCES `University`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
