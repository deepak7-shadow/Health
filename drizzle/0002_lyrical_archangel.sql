CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int NOT NULL,
	`priority` enum('routine','significant','urgent') NOT NULL DEFAULT 'routine',
	`reason` text NOT NULL,
	`status` enum('open','reviewed','closed') NOT NULL DEFAULT 'open',
	`assignedTo` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
