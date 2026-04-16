import type { CapitalGains } from "../types";

interface Props {
  title: string;
  data: CapitalGains;
  highlight?: boolean;
  savings?: number;
}

export default function CapitalCard({
  title,
  data,
  highlight,
  savings,
}: Props) {
  const stNet = data.stcg.profits - data.stcg.losses;
  const ltNet = data.ltcg.profits - data.ltcg.losses;
  const realised = stNet + ltNet;

  const textColor = highlight ? "text-white" : "text-gray-800";
  const subText = highlight ? "text-white/80" : "text-gray-500";

  return (
    <div
      className={`p-6 rounded-2xl shadow-md ${
        highlight
          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
          : "bg-white border border-gray-200" 
      }`}
    >
      <h2 className={`font-semibold text-lg mb-4 ${textColor}`}>
        {title}
      </h2>

      {/* Header */}
      <div className={`grid grid-cols-3 text-sm font-medium mb-2 ${subText}`}>
        <p></p>
        <p className="text-center">Short-term</p>
        <p className="text-center">Long-term</p>
      </div>

      {/* Profits */}
      <div className="grid grid-cols-3 text-sm mb-2">
        <p className={subText}>Profits</p>
        <p className="text-center">₹ {data.stcg.profits.toFixed(2)}</p>
        <p className="text-center">₹ {data.ltcg.profits.toFixed(2)}</p>
      </div>

      {/* Losses */}
      <div className="grid grid-cols-3 text-sm mb-2">
        <p className={subText}>Losses</p>
        <p className="text-center">₹ {data.stcg.losses.toFixed(2)}</p>
        <p className="text-center">₹ {data.ltcg.losses.toFixed(2)}</p>
      </div>

      {/* Net */}
      <div className="grid grid-cols-3 text-sm font-semibold mt-3">
        <p className={textColor}>Net Capital Gains</p>

        <p
          className={`text-center ${
            stNet >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          ₹ {stNet.toFixed(2)}
        </p>

        <p
          className={`text-center ${
            ltNet >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          ₹ {ltNet.toFixed(2)}
        </p>
      </div>

      {/* Total */}
      <div className="mt-5 text-lg font-bold">
        {highlight
          ? "Effective Capital Gains"
          : "Realised Capital Gains"}
        : ₹ {realised.toFixed(2)}
      </div>

      {/* Savings */}
      {highlight && savings !== undefined && savings > 0 && (
        <p className="mt-3 text-yellow-200 font-medium">
          🎉 You are going to save upto ₹ {savings.toFixed(2)}
        </p>
      )}
    </div>
  );
}