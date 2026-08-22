export type PrototypeSignals = {
  selfReport: number;
  trend: number;
  context: number;
  engagement: number;
};

/**
 * Transparent demo-only score. It is not a clinical instrument or diagnosis.
 */
export function calculatePrototypeDistressScore(signals: PrototypeSignals) {
  const values = Object.values(signals);
  if (values.some((value) => !Number.isFinite(value) || value < 0 || value > 100)) {
    throw new Error("Prototype signals must be numbers between 0 and 100");
  }

  return Math.round(
    signals.selfReport * 0.4 +
      signals.trend * 0.25 +
      signals.context * 0.2 +
      signals.engagement * 0.15,
  );
}

export function getPrototypeBand(score: number) {
  if (score >= 75) return "acute" as const;
  if (score >= 50) return "significant" as const;
  if (score >= 25) return "emerging" as const;
  return "stable" as const;
}
