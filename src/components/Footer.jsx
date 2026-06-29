export default function Footer() {
  return (
    <footer className="w-full bg-[#CFCBCA] text-slate-700 py-4 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs font-medium tracking-wide">© {new Date().getFullYear()} CineTracker. College Project Presentation.</p>
      </div>
    </footer>
  );
}
