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
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#243E36] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-[#9F915A] p-1.5 rounded-lg group-hover:opacity-90 transition-opacity">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              CineTracker
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-white/90 text-xs hidden sm:block font-medium tracking-wide">My Movie Watchlist</span>
            
            <div className="h-4 w-px bg-white/20 mx-1 hidden sm:block"></div>
            
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border-2 border-[#9F915A] bg-[#E0EEC6] object-cover hover:scale-105 transition-transform" 
                  />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#E0EEC6] rounded-xl shadow-lg py-1 border border-black/5 z-50 overflow-hidden">
                    <div className="px-4 py-2 border-b border-black/5">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-600 truncate">{user.email}</p>
                    </div>
                    <Link 
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-800 hover:bg-[#9F915A] hover:text-white transition-colors"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <SignInModal />
                <SignUpModal />
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
