import { Film } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-indigo-400" />
            <span className="font-bold text-xl tracking-tight">CineTracker</span>
          </div>
          <div>
            <span className="text-slate-300 text-sm hidden sm:block">My Movie Watchlist</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
