import { useState } from "react";
import type { Holding } from "../types";

interface Props {
  data: Holding[];
  selected: string[];
  setSelected: (ids: string[]) => void;
}

export default function HoldingsTable({ data, selected, setSelected }: Props) {
  const [showAll, setShowAll] = useState(false);

  const visibleData = showAll ? data : data.slice(0, 4);

  const toggle = (coin: string) => {
    if (selected.includes(coin)) {
      setSelected(selected.filter((c) => c !== coin));
    } else {
      setSelected([...selected, coin]);
    }
  };

  const toggleAll = () => {
    const allSelected = visibleData.every((d) =>
      selected.includes(d.coin)
    );

    if (allSelected) {
      setSelected(
        selected.filter((c) => !visibleData.some((d) => d.coin === c))
      );
    } else {
      setSelected([
        ...new Set([...selected, ...visibleData.map((d) => d.coin)]),
      ]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 my-6">
      <h2 className="font-semibold text-lg mb-4">Holdings</h2>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="p-2 w-10 text-center">
                <input
                  type="checkbox"
                  checked={visibleData.every((d) =>
                    selected.includes(d.coin)
                  )}
                  onChange={toggleAll}
                />
              </th>
              <th className="text-left p-2">Asset</th>
              <th className="text-left p-2">
                <div className="flex flex-col leading-tight">
                  <span>Holdings</span>
                  <span className="text-xs text-gray-400">
                    Current Market Rate
                  </span>
                </div>
              </th>
              <th className="text-left p-2">Current Price</th>
              <th className="text-left p-2">Short-term</th>
              <th className="text-left p-2">Long-term</th>
              <th className="text-left p-2">Amount to Sell</th>
            </tr>
          </thead>

          <tbody>
            {visibleData.map((h) => {
              const isSelected = selected.includes(h.coin);

              return (
                <tr
                  key={h.coin}
                  className={`border-b hover:bg-gray-50 ${
                    isSelected ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(h.coin)}
                    />
                  </td>

                  <td className="p-2 flex items-center gap-2">
                    <img src={h.logo} className="w-6 h-6 rounded-full" />
                    <div>
                      <p className="font-medium">{h.coin}</p>
                      <p className="text-xs text-gray-400">
                        {h.coinName}
                      </p>
                    </div>
                  </td>

                  <td className="p-2">
                    <p className="font-medium">
                      {h.totalHolding.toFixed(4)} {h.coin}
                    </p>
                    <p className="text-xs text-gray-400">
                      ₹ {h.averageBuyPrice.toFixed(2)}
                    </p>
                  </td>

                  <td className="p-2">
                    ₹ {h.currentPrice.toLocaleString()}
                  </td>

                  <td className="p-2">
                    <p
                      className={
                        h.stcg.gain >= 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      ₹ {h.stcg.gain.toFixed(2)}
                    </p>
                  </td>

                  <td className="p-2">
                    <p
                      className={
                        h.ltcg.gain >= 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      ₹ {h.ltcg.gain.toFixed(2)}
                    </p>
                  </td>

                  <td className="p-2">
                    {isSelected
                      ? `${h.totalHolding.toFixed(4)} ${h.coin}`
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards */}
      <div className="md:hidden space-y-4">
        {visibleData.map((h) => {
          const isSelected = selected.includes(h.coin);

          return (
            <div
              key={h.coin}
              className={`border rounded-xl p-4 shadow-sm ${
                isSelected ? "bg-blue-50" : "bg-white"
              }`}
            >
              {/* Top Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    src={h.logo}
                    className="w-6 h-6 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{h.coin}</p>
                    <p className="text-xs text-gray-400">
                      {h.coinName}
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(h.coin)}
                />
              </div>

              {/* Details */}
              <div className="mt-3 text-sm space-y-1">
                <p>
                  <span className="text-gray-500">Holdings:</span>{" "}
                  {h.totalHolding.toFixed(4)} {h.coin}
                </p>
                <p>
                  <span className="text-gray-500">Price:</span> ₹{" "}
                  {h.currentPrice.toLocaleString()}
                </p>

                <p
                  className={
                    h.stcg.gain >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  STCG: ₹ {h.stcg.gain.toFixed(2)}
                </p>

                <p
                  className={
                    h.ltcg.gain >= 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  LTCG: ₹ {h.ltcg.gain.toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All */}
      {data.length > 4 && (
        <p
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 text-sm mt-3 cursor-pointer"
        >
          {showAll ? "View Less" : "View All"}
        </p>
      )}
    </div>
  );
}