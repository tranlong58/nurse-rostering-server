/*
  Warnings:

  - The primary key for the `staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `staffID` on the `staff` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `staff` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `schedule_staffId_fkey`;

-- DropIndex
DROP INDEX `staff_staffID_key` ON `staff`;

-- AlterTable
ALTER TABLE `staff` DROP PRIMARY KEY,
    DROP COLUMN `staffID`,
    MODIFY `id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `staff_id_key` ON `staff`(`id`);

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
