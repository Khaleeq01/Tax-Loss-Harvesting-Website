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

  const textColor = highlight ? "text-white" : "text-[#1B1E2D]";
  const subText = highlight ? "text-white" : "text-[#4B5563]";
  const cardBg = highlight ? "bg-[#3E74FF]" : "bg-white";

  const formatValue = (val: number, isLossRow = false, isNet = false) => {
    const absVal = Math.abs(val).toLocaleString("en-US");
    if (isLossRow) {
      return val === 0 ? `$ 0` : `- $ ${absVal}`;
    }
    if (isNet) {
      return val < 0 ? `- $ ${absVal}` : `$ ${absVal}`;
    }
    return `$ ${absVal}`;
  };

  return (
    <div className={`p-6 rounded-xl shadow-sm border ${highlight ? "border-transparent" : "border-gray-200"} ${cardBg}`}>
      <h2 className={`font-bold text-lg mb-6 ${textColor}`}>
        {title}
      </h2>

      {/* Header */}
      <div className={`grid grid-cols-3 text-sm font-medium mb-4 ${subText}`}>
        <p></p>
        <p className="text-right">Short-term</p>
        <p className="text-right">Long-term</p>
      </div>

      {/* Profits */}
      <div className={`grid grid-cols-3 text-sm mb-4 ${textColor}`}>
        <p className={subText}>Profits</p>
        <p className="text-right font-medium">{formatValue(data.stcg.profits)}</p>
        <p className="text-right font-medium">{formatValue(data.ltcg.profits)}</p>
      </div>

      {/* Losses */}
      <div className={`grid grid-cols-3 text-sm mb-6 ${textColor}`}>
        <p className={subText}>Losses</p>
        <p className="text-right font-medium">{formatValue(data.stcg.losses, true)}</p>
        <p className="text-right font-medium">{formatValue(data.ltcg.losses, true)}</p>
      </div>

      <div className={`grid grid-cols-3 text-sm font-semibold mb-8 ${textColor}`}>
        <p>Net Capital Gains</p>
        <p className="text-right">{formatValue(stNet, false, true)}</p>
        <p className="text-right">{formatValue(ltNet, false, true)}</p>
      </div>

      {/* Total */}
      <div className={`flex items-baseline gap-3 ${textColor}`}>
        <span className="font-semibold text-base">
          {highlight ? "Effective Capital Gains:" : "Realised Capital Gains:"}
        </span>
        <span className="text-2xl font-bold">
          {realised < 0
            ? `- $${Math.abs(realised).toLocaleString("en-US")}`
            : `$${realised.toLocaleString("en-US")}`}
        </span>
      </div>

      {/* Savings */}
      {highlight && savings !== undefined && savings > 0 && (
        <p className="mt-4 text-[#FFD600] font-medium text-sm">
          🎉 You are going to save upto $ {savings.toLocaleString("en-US")}
        </p>
      )}
    </div>
  );
}