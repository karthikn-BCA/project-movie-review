export default function Footer() {
  return (
    <footer className="w-full bg-slate-950/30 backdrop-blur-sm border-t border-white/5 text-slate-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-medium tracking-wide">© {new Date().getFullYear()} CineTracker. College Project Presentation.</p>
      </div>
    </footer>
  );
}
