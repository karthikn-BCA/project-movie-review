import { Film } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-slate-900 dark:bg-slate-800 p-1.5 rounded-lg group-hover:bg-slate-800 dark:group-hover:bg-slate-700 transition-colors">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">
              CineTracker
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 dark:text-slate-400 text-xs hidden sm:block font-medium tracking-wide">My Movie Watchlist</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
