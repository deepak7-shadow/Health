import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(), openId: varchar("openId", { length: 64 }).notNull().unique(), name: text("name"), email: varchar("email", { length: 320 }), loginMethod: varchar("loginMethod", { length: 64 }), role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(), lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export const victimCases = mysqlTable("victimCases", {
  id: int("id").autoincrement().primaryKey(), pseudonym: varchar("pseudonym", { length: 32 }).notNull(), district: varchar("district", { length: 96 }).notNull(), safeContact: varchar("safeContact", { length: 32 }).notNull(), consentStatus: mysqlEnum("consentStatus", ["recorded", "paused", "withdrawn"]).default("recorded").notNull(), currentScore: int("currentScore").default(0).notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const checkIns = mysqlTable("checkIns", {
  id: int("id").autoincrement().primaryKey(), caseId: int("caseId").notNull(), language: varchar("language", { length: 32 }).notNull(), safeChannel: varchar("safeChannel", { length: 32 }).notNull(), score: int("score"), dataQuality: varchar("dataQuality", { length: 64 }), status: mysqlEnum("status", ["submitted", "skipped", "paused"]).default("submitted").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const alerts = mysqlTable("alerts", {
  id: int("id").autoincrement().primaryKey(), caseId: int("caseId").notNull(), priority: mysqlEnum("priority", ["routine", "significant", "urgent"]).default("routine").notNull(), reason: text("reason").notNull(), status: mysqlEnum("status", ["open", "reviewed", "closed"]).default("open").notNull(), assignedTo: int("assignedTo"), createdAt: timestamp("createdAt").defaultNow().notNull(), reviewedAt: timestamp("reviewedAt"),
});
export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(), caseId: int("caseId").notNull(), category: varchar("category", { length: 96 }).notNull(), owner: varchar("owner", { length: 128 }).notNull(), dueDate: timestamp("dueDate"), status: mysqlEnum("status", ["awaiting", "in_progress", "completed"]).default("awaiting").notNull(), followUpNotes: text("followUpNotes"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const auditEvents = mysqlTable("auditEvents", {
  id: int("id").autoincrement().primaryKey(), actorUserId: int("actorUserId"), caseId: int("caseId"), eventType: varchar("eventType", { length: 64 }).notNull(), summary: text("summary").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type VictimCase = typeof victimCases.$inferSelect;
export type CheckIn = typeof checkIns.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type AuditEvent = typeof auditEvents.$inferSelect;
