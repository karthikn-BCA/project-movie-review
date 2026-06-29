import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CineTracker - Movie Watchlist",
  description: "A straightforward, functional, and clean Movie Watchlist Web Application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className="font-sans antialiased bg-slate-950 text-slate-50 min-h-screen flex flex-col"
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
