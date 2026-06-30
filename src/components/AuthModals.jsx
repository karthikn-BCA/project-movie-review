"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "./AuthProvider";
import { LogIn, UserPlus } from "lucide-react";

export function SignInModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    login(email, password);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1">
        <LogIn className="w-4 h-4" /> Sign In
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-[#243E36] text-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">Email Address</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A]"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#9F915A] hover:opacity-90 text-white font-bold py-2.5 rounded-xl disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SignUpModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));
    signup(name, email, password);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-sm font-bold bg-white text-[#243E36] hover:bg-gray-100 px-4 py-1.5 rounded-full transition-colors shadow-sm flex items-center gap-1">
        <UserPlus className="w-4 h-4" /> Sign Up
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-[#243E36] text-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create an Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">Full Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A]"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">Email Address</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A]"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-white">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#E0EEC6] border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-[#9F915A]"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#9F915A] hover:opacity-90 text-white font-bold py-2.5 rounded-xl disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
