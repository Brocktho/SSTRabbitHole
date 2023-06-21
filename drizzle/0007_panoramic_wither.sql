ALTER TABLE `Note` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Note` MODIFY COLUMN `updatedAt` timestamp DEFAULT (now());