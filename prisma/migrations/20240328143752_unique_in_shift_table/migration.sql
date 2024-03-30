/*
  Warnings:

  - A unique constraint covering the columns `[kind,date]` on the table `shift` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `shift_kind_date_key` ON `shift`(`kind`, `date`);
