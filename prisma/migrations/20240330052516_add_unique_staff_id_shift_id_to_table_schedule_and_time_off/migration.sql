/*
  Warnings:

  - A unique constraint covering the columns `[staffId,shiftId]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffId,shiftId]` on the table `timeOff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `schedule_staffId_shiftId_key` ON `schedule`(`staffId`, `shiftId`);

-- CreateIndex
CREATE UNIQUE INDEX `timeOff_staffId_shiftId_key` ON `timeOff`(`staffId`, `shiftId`);
