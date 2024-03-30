/*
  Warnings:

  - The primary key for the `timeOff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `timeOff` table. All the data in the column will be lost.
  - Added the required column `id` to the `timeOff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `timeOff` DROP PRIMARY KEY,
    DROP COLUMN `int`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
