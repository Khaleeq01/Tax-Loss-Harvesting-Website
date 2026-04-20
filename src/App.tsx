import CapitalCard from "./components/CapitalCard";
import Disclaimer from "./components/Disclaimer";
import Header from "./components/Header";
import HoldingsTable from "./components/HoldingsTable";
import useTaxHarvesting from "./hooks/useTaxHarvesting";


export default function App() {
  const {
    holdings,
    base,
    selected,
    setSelected,
    after,
    savings,
    loading,
    error,
  } = useTaxHarvesting();

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </p>
      </div>
    );
  }

  // ✅ Safety check (optional but clean)
  if (!base || !after) return null;

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#1B1E2D]">
      <Header />
      
      <div className="px-4 md:px-8 lg:px-10 py-6 max-w-[1400px] mx-auto">
        {/* Title Row */}
        <div className="flex items-center gap-3 mb-6 mt-2">
          <h2 className="text-[22px] font-bold">Tax Harvesting</h2>

          {/* Hover Tooltip */}
          <div className="relative group inline-block">
            <div className="flex items-center gap-1 text-blue-600 text-sm font-medium cursor-pointer underline hover:text-blue-700">
              <span>How it works?</span>
            </div>

            {/* Tooltip */}
            <div className="absolute left-0 top-8 w-[360px] p-4 text-xs text-[#D1D5DB] bg-[#1B1E2D] rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              {/* Arrow */}
              <div className="absolute left-8 -top-1.5 w-3 h-3 bg-[#1B1E2D] rotate-45"></div>

              Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. <span className="underline text-blue-400 cursor-pointer">Know More</span>
            </div>
          </div>
        </div>

        <Disclaimer />

        <div className="grid md:grid-cols-2 gap-6">
          <CapitalCard title="Pre Harvesting" data={base} />
          <CapitalCard
            title="After Harvesting"
            data={after}
            highlight
            savings={savings}
          />
        </div>

        <HoldingsTable
          data={holdings}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
}