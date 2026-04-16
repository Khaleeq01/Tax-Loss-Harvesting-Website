import { useState } from "react";
import { FiInfo, FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function Disclaimer() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-blue-200 bg-blue-50 rounded-xl p-4 mb-6">
      
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <FiInfo className="text-blue-600" size={18} />
          <p className="font-semibold text-blue-900">
            Important Notes & Disclaimers
          </p>
        </div>

        {/* Toggle icon */}
        <span className="text-blue-700">
          {open ? (
            <FiChevronDown size={18} />
          ) : (
            <FiChevronRight size={18} />
          )}
        </span>
      </div>

      {/* Content */}
      {open && (
        <ul className="mt-3 text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>
            Tax-loss harvesting is currently not allowed under Indian tax
            regulations.
          </li>
          <li>Tax harvesting does not apply to derivatives or futures.</li>
          <li>Price and market value data is fetched from Coingecko.</li>
          <li>
            Some countries do not have short-term / long-term bifurcation.
          </li>
          <li>Only realized losses are considered.</li>
        </ul>
      )}
    </div>
  );
}