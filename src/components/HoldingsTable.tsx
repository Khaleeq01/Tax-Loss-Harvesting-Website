import { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import type { Holding } from "../types";

interface Props {
  data: Holding[];
  selected: string[];
  setSelected: (ids: string[]) => void;
}

export default function HoldingsTable({ data, selected, setSelected }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: 'stcg', direction: 'asc' | 'desc' } | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    if (sortConfig.key === 'stcg') {
      if (a.stcg.gain < b.stcg.gain) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a.stcg.gain > b.stcg.gain) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const visibleData = showAll ? sortedData : sortedData.slice(0, 4);

  const toggle = (coin: string) => {
    if (selected.includes(coin)) {
      setSelected(selected.filter((c) => c !== coin));
    } else {
      setSelected([...selected, coin]);
    }
  };

  const toggleAll = () => {
    const allSelected = visibleData.length > 0 && visibleData.every((d) => selected.includes(d.coin));

    if (allSelected) {
      setSelected(selected.filter((c) => !visibleData.some((d) => d.coin === c)));
    } else {
      setSelected([...new Set([...selected, ...visibleData.map((d) => d.coin)])]);
    }
  };

  const handleSort = () => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === 'stcg' && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: 'stcg', direction });
  };

  const formatGain = (gain: number) => {
    const absGain = Math.abs(gain).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    if (gain < 0) return `-$${absGain}`;
    if (gain > 0) return `+$${absGain}`;
    return `$${absGain}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 mb-8 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-bold text-[20px] text-[#1B1E2D]">Holdings</h2>
      </div>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto p-4">
        <table className="w-full text-sm min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-[#F5F7FB] text-[#4B5563] font-medium text-left">
              <th className="p-3 w-12 text-center rounded-l-lg">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                  checked={visibleData.length > 0 && visibleData.every((d) => selected.includes(d.coin))}
                  onChange={toggleAll}
                />
              </th>
              <th className="p-3 font-medium">Asset</th>
              <th className="p-3 font-medium text-center">
                <div className="flex flex-col leading-tight items-center">
                  <span>Holdings</span>
                  <span className="text-[11px] text-[#8C929E] mt-0.5">Current Market Rate</span>
                </div>
              </th>
              <th className="p-3 font-medium text-center">Current Price</th>
              <th 
                className="p-3 font-medium text-center cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                onClick={handleSort}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>Short-term</span>
                  <div className="flex flex-col">
                    <FiChevronUp className={`w-3 h-3 ${sortConfig?.key === 'stcg' && sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <FiChevronDown className={`w-3 h-3 -mt-1 ${sortConfig?.key === 'stcg' && sortConfig.direction === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                </div>
              </th>
              <th className="p-3 font-medium text-center">Long-Term</th>
              <th className="p-3 font-medium text-center rounded-r-lg">Amount to Sell</th>
            </tr>
          </thead>

          <tbody>
            {visibleData.map((h) => {
              const isSelected = selected.includes(h.coin);
              const totalValue = h.totalHolding * h.currentPrice;

              return (
                <tr
                  key={h.coin}
                  className={`border-b border-gray-100 last:border-0 transition-colors ${isSelected ? "bg-[#F4F7FF]" : "hover:bg-gray-50"
                    }`}
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                      checked={isSelected}
                      onChange={() => toggle(h.coin)}
                    />
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={h.logo} className="w-7 h-7 rounded-full object-contain" />
                      <div>
                        <p className="font-medium text-[#1B1E2D]">{h.coinName}</p>
                        <p className="text-xs text-[#8C929E]">{h.coin}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <p className="font-medium text-[#1B1E2D]">
                      {h.totalHolding.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 5 })} {h.coin}
                    </p>
                    <p className="text-xs text-[#8C929E] mt-0.5">
                      $ {h.currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/{h.coin}
                    </p>
                  </td>

                  <td className="p-4 text-center font-medium text-[#1B1E2D] relative group">
                    <span className="cursor-help border-b border-dashed border-gray-400 pb-0.5">
                      $ {totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    
                    {/* Black Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max z-50">
                      <div className="bg-[#1B1E2D] text-white text-xs font-normal rounded-lg py-1.5 px-3 shadow-lg relative">
                        $ {totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#1B1E2D]"></div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <p className={`font-medium ${h.stcg.gain >= 0 ? "text-[#00B873]" : "text-[#FF4A4A]"}`}>
                      {formatGain(h.stcg.gain)}
                    </p>
                    <p className="text-xs text-[#8C929E] mt-0.5">
                      {h.stcg.balance.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 5 })} {h.coin}
                    </p>
                  </td>

                  <td className="p-4 text-center">
                    <p className={`font-medium ${h.ltcg.gain >= 0 ? "text-[#00B873]" : "text-[#FF4A4A]"}`}>
                      {formatGain(h.ltcg.gain)}
                    </p>
                    <p className="text-xs text-[#8C929E] mt-0.5">
                      {h.ltcg.balance.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 5 })} {h.coin}
                    </p>
                  </td>

                  <td className="p-4 text-center font-medium text-[#1B1E2D]">
                    {isSelected ? `${h.totalHolding.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 5 })} ${h.coin}` : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* View All */}
        {data.length > 4 && (
          <div className="mt-4 px-2">
            <span
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
            >
              {showAll ? "View less" : "View all"}
            </span>
          </div>
        )}
      </div>

      {/* ✅ Mobile Table (Replaces Cards) */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-[#F5F7FB] px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-600 cursor-pointer"
              checked={visibleData.length > 0 && visibleData.every((d) => selected.includes(d.coin))}
              onChange={toggleAll}
            />
            <span className="text-sm font-medium text-[#4B5563]">Asset</span>
          </div>
          <span className="text-sm font-medium text-[#4B5563]">Holdings</span>
        </div>

        {/* Mobile Rows */}
        <div className="flex flex-col">
          {visibleData.map((h) => {
            const isSelected = selected.includes(h.coin);
            const totalValue = h.totalHolding * h.currentPrice;

            return (
              <div
                key={h.coin}
                className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 bg-white"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                    checked={isSelected}
                    onChange={() => toggle(h.coin)}
                  />
                  <div className="flex items-center gap-2">
                    <img src={h.logo} className="w-6 h-6 rounded-full object-contain" alt={h.coinName} />
                    <div>
                      <p className="font-medium text-[15px] text-[#1B1E2D] leading-tight">{h.coinName}</p>
                      <p className="text-[13px] text-[#8C929E] mt-0.5">{h.coin}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium text-[15px] text-[#1B1E2D] leading-tight">
                    {h.totalHolding.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 5 })} {h.coin}
                  </p>
                  <p className="text-[13px] text-[#8C929E] mt-0.5">
                    $ {totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All */}
        {data.length > 4 && (
          <div className="p-4 pt-2 text-left">
            <span
              onClick={() => setShowAll(!showAll)}
              className="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
            >
              {showAll ? "View less" : "View all"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
