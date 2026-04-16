export default function Header() {
  return (
    <>
      {/* Logo */}
     <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-1 py-4 flex items-center">
        
    <img
      src="/koinx-logo.png" 
      alt="KoinX"
      className="h-6 object-contain"
    />
  </div>
</div>

      {/* Title Row */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Tax Harvesting</h2>

        {/* Hover Tooltip */}
        <div className="relative group inline-block">
          <div className="flex items-center gap-1 text-blue-600 text-md cursor-pointer underline">
            <span>How it works?</span>
          </div>

          {/* Tooltip */}
          <div className="absolute left-0 top-6 w-64 p-3 text-sm text-white bg-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
            
            {/* Arrow */}
            <div className="absolute left-3 -top-1 w-3 h-3 bg-black rotate-45"></div>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, nisi vel consectetur euismod.
          </div>
        </div>
      </div>
    </>
  );
}