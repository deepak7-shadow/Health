import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function context(role: "user" | "admin"): TrpcContext {
  return {
    user: { id: 1, openId: `${role}-test`, email: `${role}@example.com`, name: role, loginMethod: "test", role, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("workspace access boundaries", () => {
  it("allows authenticated users to access case, check-in, and referral records but limits alerts to admins", async () => {
    const caller = appRouter.createCaller(context("user"));
    const checkIns = await caller.workspace.checkIns();
    const cases = await caller.workspace.cases();
    const referrals = await caller.workspace.referrals();
    const alerts = await caller.workspace.alerts();
    expect(Array.isArray(checkIns)).toBe(true);
    expect(Array.isArray(cases)).toBe(true);
    expect(Array.isArray(referrals)).toBe(true);
    expect(alerts).toEqual([]);
  });

  it("allows admins to access audit and alert records", async () => {
    const caller = appRouter.createCaller(context("admin"));
    expect(Array.isArray(await caller.workspace.audit())).toBe(true);
    expect(Array.isArray(await caller.workspace.alerts())).toBe(true);
  });
});
