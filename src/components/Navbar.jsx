"use client";

import { useState, useRef, useEffect } from "react";
import { Film, User, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SignInModal, SignUpModal } from "./AuthModals";
import { useAuth } from "./AuthProvider";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoDropdownOpen, setLogoDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);
  const logoDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (logoDropdownRef.current && !logoDropdownRef.current.contains(event.target)) {
        setLogoDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo Area */}
          <div className="flex items-center gap-2">
            {!user ? (
              <div className="relative" ref={logoDropdownRef}>
                <div 
                  onClick={() => setLogoDropdownOpen(!logoDropdownOpen)}
                  className="bg-[#D4AF37] dark:bg-[#E50914] p-1.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                  title="Sign In / Sign Up"
                >
                  <Film className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
                {logoDropdownOpen && (
                  <div className="absolute left-0 mt-3 w-48 bg-slate-100 dark:bg-zinc-800 rounded-xl shadow-xl py-3 px-3 border border-black/5 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="text-xs text-slate-900 dark:text-white/70 text-center font-bold tracking-wide uppercase">Account Options</div>
                    <div className="flex flex-col gap-2">
                      <SignInModal />
                      <SignUpModal />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/">
                <div className="bg-[#D4AF37] dark:bg-[#E50914] p-1.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
                  <Film className="w-5 h-5 text-slate-900 dark:text-white" />
                </div>
              </Link>
            )}
            
            <Link href="/">
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white hover:text-slate-500 dark:text-slate-400 transition-colors cursor-pointer">
                CineTracker
              </span>
            </Link>
          </div>

          {/* Right Side Options */}
          <div className="flex items-center gap-4">
            <span className="text-slate-600 dark:text-slate-300 text-xs hidden sm:block font-medium tracking-wide">My Movie Watchlist</span>
            
            <div className="h-4 w-px bg-white/20 mx-1 hidden sm:block"></div>
            
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border-2 border-[#D4AF37] dark:border-[#E50914] bg-slate-100 dark:bg-zinc-800 object-cover hover:scale-105 transition-transform shadow-sm" 
                  />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-100 dark:bg-zinc-800 rounded-xl shadow-xl py-1 border border-black/5 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-zinc-800/10">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-900 dark:text-white/70 truncate font-medium">{user.email}</p>
                    </div>
                    <Link 
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-white hover:bg-[#D4AF37] dark:bg-[#E50914] hover:text-white transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
