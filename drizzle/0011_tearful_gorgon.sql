ALTER TABLE `Note` DROP FOREIGN KEY `Note_userId_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `Password` DROP FOREIGN KEY `Password_userId_User_id_fk`;
--> statement-breakpoint
ALTER TABLE `User` ADD `avatar` varchar(255);