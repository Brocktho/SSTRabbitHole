ALTER TABLE `User` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `avatar` varchar(255) NOT NULL DEFAULT 'N/A';