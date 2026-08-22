CREATE TABLE `auditEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`actorUserId` int,
	`caseId` int,
	`eventType` varchar(64) NOT NULL,
	`summary` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `checkIns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int NOT NULL,
	`language` varchar(32) NOT NULL,
	`safeChannel` varchar(32) NOT NULL,
	`score` int,
	`dataQuality` varchar(64),
	`status` enum('submitted','skipped','paused') NOT NULL DEFAULT 'submitted',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `checkIns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`caseId` int NOT NULL,
	`category` varchar(96) NOT NULL,
	`owner` varchar(128) NOT NULL,
	`dueDate` timestamp,
	`status` enum('awaiting','in_progress','completed') NOT NULL DEFAULT 'awaiting',
	`followUpNotes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `victimCases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pseudonym` varchar(32) NOT NULL,
	`district` varchar(96) NOT NULL,
	`safeContact` varchar(32) NOT NULL,
	`consentStatus` enum('recorded','paused','withdrawn') NOT NULL DEFAULT 'recorded',
	`currentScore` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `victimCases_id` PRIMARY KEY(`id`)
);
