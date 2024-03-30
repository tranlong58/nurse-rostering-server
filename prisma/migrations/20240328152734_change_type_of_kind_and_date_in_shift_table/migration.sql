/*
  Warnings:

  - You are about to alter the column `kind` on the `shift` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `date` on the `shift` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `shift` MODIFY `kind` INTEGER NOT NULL,
    MODIFY `date` INTEGER NOT NULL;
