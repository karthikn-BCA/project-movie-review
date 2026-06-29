import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CineTracker - Movie Watchlist",
  description: "A straightforward, functional, and clean Movie Watchlist Web Application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-slate-200"
      >
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
