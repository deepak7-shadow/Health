import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { listAlerts, listAuditEvents, listCheckIns, listReferrals, listVictimCases } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  workspace: router({
    cases: protectedProcedure.query(() => listVictimCases()),
    checkIns: protectedProcedure.query(() => listCheckIns()),
    alerts: protectedProcedure.query(({ ctx }) => ctx.user.role === "admin" ? listAlerts() : []),
    referrals: protectedProcedure.query(() => listReferrals()),
    audit: protectedProcedure.query(({ ctx }) => ctx.user.role === "admin" ? listAuditEvents() : []),
    oversight: adminProcedure.query(() => ({ scope: "national" as const, detailPolicy: "Aggregated only; small groups suppressed" })),
  }),
});

export type AppRouter = typeof appRouter;
