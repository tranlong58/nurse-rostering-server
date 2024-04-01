/*
  Warnings:

  - You are about to drop the column `date` on the `shift` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kind,day]` on the table `shift` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `shift` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `shift_kind_date_key` ON `shift`;

-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `shift` DROP COLUMN `date`,
    ADD COLUMN `day` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `draft` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `staffId` INTEGER NOT NULL,
    `shiftId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `draft_staffId_shiftId_key`(`staffId`, `shiftId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `shift_kind_day_key` ON `shift`(`kind`, `day`);

-- AddForeignKey
ALTER TABLE `draft` ADD CONSTRAINT `draft_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `draft` ADD CONSTRAINT `draft_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
