ALTER TABLE `Note` MODIFY COLUMN `id` varchar(191) NOT NULL DEFAULT 'ba122514-88a9-4355-a0fb-4a5804037f4e';--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `id` varchar(191) NOT NULL DEFAULT '860abe48-5201-40aa-b64f-5a3edf8bfba0';--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_idx` ON `Note` (`userId`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_id_idx` ON `Password` (`userId`);