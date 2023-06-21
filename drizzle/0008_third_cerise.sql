ALTER TABLE `Note` MODIFY COLUMN `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP;