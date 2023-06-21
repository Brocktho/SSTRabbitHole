DROP INDEX `user_id_idx` ON `Note`;--> statement-breakpoint
ALTER TABLE `Note` MODIFY COLUMN `title` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `Note` MODIFY COLUMN `body` text NOT NULL;--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `Note` (`userId`);