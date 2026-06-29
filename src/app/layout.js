import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "CineTracker - Movie Watchlist",
  description: "A clean and functional movie watchlist application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-sans antialiased bg-[#2364AA] text-white min-h-screen flex flex-col transition-colors"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
