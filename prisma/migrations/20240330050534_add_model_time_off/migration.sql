-- CreateTable
CREATE TABLE `timeOff` (
    `int` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `staffId` INTEGER NOT NULL,
    `shiftId` INTEGER NOT NULL,

    PRIMARY KEY (`int`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `timeOff` ADD CONSTRAINT `timeOff_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `timeOff` ADD CONSTRAINT `timeOff_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `shift`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
