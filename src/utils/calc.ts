import type { CapitalGains, Holding } from "../types";

export const calculateNet = (profits: number, losses: number) =>
  profits - losses;

export const calculateRealised = (cg: CapitalGains) => {
  const st = calculateNet(cg.stcg.profits, cg.stcg.losses);
  const lt = calculateNet(cg.ltcg.profits, cg.ltcg.losses);
  return st + lt;
};

export const applyHarvesting = (
  base: CapitalGains,
  selected: Holding[]
): CapitalGains => {
  const updated = JSON.parse(JSON.stringify(base));

  selected.forEach((h) => {
    // STCG
    if (h.stcg.gain > 0) {
      updated.stcg.profits += h.stcg.gain;
    } else {
      updated.stcg.losses += Math.abs(h.stcg.gain);
    }

    // LTCG
    if (h.ltcg.gain > 0) {
      updated.ltcg.profits += h.ltcg.gain;
    } else {
      updated.ltcg.losses += Math.abs(h.ltcg.gain);
    }
  });

  return updated;
};