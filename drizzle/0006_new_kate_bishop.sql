ALTER TABLE `Note` MODIFY COLUMN `id` varchar(191) NOT NULL DEFAULT (uuid());--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `id` varchar(191) NOT NULL DEFAULT (uuid());