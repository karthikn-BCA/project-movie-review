export default function Footer() {
  return (
    <footer className="w-full bg-white/80 border-t border-slate-200 text-slate-500 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs font-medium tracking-wide">© {new Date().getFullYear()} CineTracker. College Project Presentation.</p>
      </div>
    </footer>
  );
}
