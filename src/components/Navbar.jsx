import { Film } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#3DA5D9] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-[#EA7317] p-1.5 rounded-lg group-hover:opacity-90 transition-opacity">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              CineTracker
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/90 text-xs hidden sm:block font-medium tracking-wide">My Movie Watchlist</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
