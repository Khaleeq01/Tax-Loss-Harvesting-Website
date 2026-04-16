import type { Holding, CapitalGains } from "../types";
import holdingsData from "./holding.json";
import capitalData from "./capitalGains.json";

export const fetchHoldings = async (): Promise<Holding[]> => {
  return holdingsData;
};

export const fetchCapitalGains = async (): Promise<{ capitalGains: CapitalGains }> => {
   return capitalData;
};