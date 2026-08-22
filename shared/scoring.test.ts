import { describe, expect, it } from "vitest";
import { calculatePrototypeDistressScore, getPrototypeBand } from "./scoring";

describe("prototype distress scoring", () => {
  it("uses the transparent weighted signal formula", () => {
    expect(calculatePrototypeDistressScore({ selfReport: 80, trend: 60, context: 50, engagement: 40 })).toBe(63);
  });

  it("returns safe, explicit prototype bands", () => {
    expect(getPrototypeBand(24)).toBe("stable");
    expect(getPrototypeBand(25)).toBe("emerging");
    expect(getPrototypeBand(50)).toBe("significant");
    expect(getPrototypeBand(75)).toBe("acute");
  });

  it("rejects out-of-range or non-finite signals", () => {
    expect(() => calculatePrototypeDistressScore({ selfReport: 101, trend: 20, context: 20, engagement: 20 })).toThrow();
    expect(() => calculatePrototypeDistressScore({ selfReport: Number.NaN, trend: 20, context: 20, engagement: 20 })).toThrow();
  });
});
