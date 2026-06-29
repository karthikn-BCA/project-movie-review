export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">© {new Date().getFullYear()} CineTracker. College Project Presentation.</p>
      </div>
    </footer>
  );
}
