ALTER TABLE `Note` MODIFY COLUMN `id` binary(26) NOT NULL;--> statement-breakpoint
ALTER TABLE `Note` MODIFY COLUMN `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `Note` MODIFY COLUMN `userId` binary(26);--> statement-breakpoint
ALTER TABLE `Password` MODIFY COLUMN `hash` binary(60);--> statement-breakpoint
ALTER TABLE `Password` MODIFY COLUMN `userId` binary(26) NOT NULL;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `id` binary(26) NOT NULL;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `email` varchar(255);