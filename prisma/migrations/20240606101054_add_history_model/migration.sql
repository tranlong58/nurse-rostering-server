/*
  Warnings:

  - You are about to drop the `timeOff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `timeOff` DROP FOREIGN KEY `timeOff_shiftId_fkey`;

-- DropForeignKey
ALTER TABLE `timeOff` DROP FOREIGN KEY `timeOff_staffId_fkey`;

-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `historyId` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `timeOff`;

-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_historyId_fkey` FOREIGN KEY (`historyId`) REFERENCES `history`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
