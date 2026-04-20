export default function Header() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="px-4 md:px-8 lg:px-10 h-16 flex items-center max-w-[1400px] mx-auto">
        <img
          src="/koinx-logo.png"
          alt="KoinX"
          className="h-6 object-contain"
        />
      </div>
    </div>
  );
}