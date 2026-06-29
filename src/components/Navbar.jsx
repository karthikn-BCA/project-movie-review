import { Film } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-950/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-gradient-to-br from-pink-500 to-violet-600 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-lg shadow-pink-500/20">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              CineTracker
            </span>
          </div>
          <div>
            <span className="text-slate-300 text-sm hidden sm:block font-medium tracking-wide">My Movie Watchlist</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
