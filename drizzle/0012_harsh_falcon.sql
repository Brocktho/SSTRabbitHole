CREATE TABLE `Settings` (
	`id` binary(26) PRIMARY KEY NOT NULL,
	`public` boolean DEFAULT false,
	`theme` enum('light','dark','system') DEFAULT 'system');
