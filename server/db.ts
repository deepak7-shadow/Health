import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { alerts, auditEvents, checkIns, InsertUser, referrals, users, victimCases } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb(); if (!db) return;
  const values: InsertUser = { openId: user.openId }; const updateSet: Record<string, unknown> = {};
  for (const field of ["name", "email", "loginMethod"] as const) { if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; } }
  values.lastSignedIn = user.lastSignedIn ?? new Date(); updateSet.lastSignedIn = values.lastSignedIn;
  if (user.role !== undefined || user.openId === ENV.ownerOpenId) { values.role = user.role ?? "admin"; updateSet.role = values.role; }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) { const db = await getDb(); if (!db) return undefined; const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1); return result[0]; }
export async function listVictimCases() { const db = await getDb(); return db ? db.select().from(victimCases) : []; }
export async function listCheckIns() { const db = await getDb(); return db ? db.select().from(checkIns) : []; }
export async function listAlerts() { const db = await getDb(); return db ? db.select().from(alerts) : []; }
export async function listReferrals() { const db = await getDb(); return db ? db.select().from(referrals) : []; }
export async function listAuditEvents() { const db = await getDb(); return db ? db.select().from(auditEvents) : []; }
