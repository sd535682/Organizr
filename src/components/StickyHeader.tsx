export default function StickyHeader() {
  return (
    <header className="sticky top-0 shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="text-xl font-bold">Organizr</div>
        {/* User Profile */}
        <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/50"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
