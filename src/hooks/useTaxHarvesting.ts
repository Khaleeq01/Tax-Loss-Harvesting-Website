import { useEffect, useMemo, useState } from "react";
import { fetchCapitalGains, fetchHoldings } from "../api";
import  type { CapitalGains, Holding } from "../types";
import { applyHarvesting, calculateRealised } from "../utils/calc";

export default function useTaxHarvesting() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [base, setBase] = useState<CapitalGains | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const loadData = async () => {
    try {
      const holdings = await fetchHoldings();
      const capital = await fetchCapitalGains();

      setHoldings(holdings);
      setBase(capital.capitalGains);
    } catch (err) {
      console.log(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

  const selectedHoldings = useMemo(
    () => holdings.filter((h) => selected.includes(h.coin)),
    [selected, holdings]
  );

  const after = useMemo(() => {
    if (!base) return null;
    return applyHarvesting(base, selectedHoldings);
  }, [base, selectedHoldings]);

  const savings = useMemo(() => {
    if (!base || !after) return 0;
    return calculateRealised(base) - calculateRealised(after);
  }, [base, after]);

  

  return {
    holdings,
    base,
    selected,
    setSelected,
    after,
    savings,
    loading,
    error,
  };
}