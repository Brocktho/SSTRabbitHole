CREATE TABLE `Note` (
	`id` varchar(191) PRIMARY KEY NOT NULL DEFAULT '1424be58-014d-43c3-81a2-ae06f8ef8df5',
	`title` varchar(191),
	`body` text,
	`createdAt` timestamp,
	`updatedAt` timestamp,
	`userId` varchar(191));
--> statement-breakpoint
CREATE TABLE `Password` (
	`hash` varchar(191),
	`userId` varchar(191) PRIMARY KEY NOT NULL);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(191) PRIMARY KEY NOT NULL DEFAULT 'c74389e5-164a-43e3-81fd-f66ccc5c4a8b',
	`email` varchar(191),
	`createdAt` timestamp,
	`updatedAt` timestamp);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_idx` ON `User` (`email`);--> statement-breakpoint
ALTER TABLE `Note` ADD CONSTRAINT `Note_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Password` ADD CONSTRAINT `Password_userId_User_id_fk` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE no action ON UPDATE no action;