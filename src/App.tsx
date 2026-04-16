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
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Header />
      <Disclaimer />

      <div className="grid md:grid-cols-2 gap-4">
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
  );
}