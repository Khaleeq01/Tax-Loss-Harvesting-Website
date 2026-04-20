import { useState } from "react";
import { FiInfo, FiChevronUp, FiChevronDown } from "react-icons/fi";

export default function Disclaimer() {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-[#B3CAFF] bg-[#F4F7FF] rounded-lg p-4 mb-6">
      {/* Header Row */}
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <FiInfo className="text-blue-600 flex-shrink-0" size={20} />
          <span className="text-[#1B1E2D] font-bold text-sm">
            Important Notes & Disclaimers
          </span>
        </div>
        
        <div className="flex-shrink-0 text-[#1B1E2D]">
          {open ? (
            <FiChevronUp size={20} />
          ) : (
            <FiChevronDown size={20} />
          )}
        </div>
      </div>

      {/* Content */}
      {open && (
        <ul className="text-[13px] text-[#1B1E2D] list-disc ml-8 mt-3 space-y-1.5 font-medium">
          <li>
            Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.
          </li>
          <li>
            Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.
          </li>
          <li>
            Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.
          </li>
          <li>
            Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.
          </li>
          <li>
            Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.
          </li>
        </ul>
      )}
    </div>
  );
}