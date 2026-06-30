"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, User, Bell, Shield, Camera } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    } else {
      // If no user is logged in, you could redirect to home, but we'll let it handle gracefully
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="w-16 h-16 text-[#9F915A] mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Access Denied</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-sm">
          You must be logged in to view and edit your profile settings.
        </p>
        <button 
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-[#9F915A] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Return Home
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 600));
    
    updateProfile(formData);
    
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Account Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Nav (Visual only for mock) */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-2.5 bg-[#E0EEC6] dark:bg-[#E0EEC6]/10 text-slate-900 dark:text-white font-bold rounded-lg transition-colors">
            <User className="w-4 h-4" /> Profile
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 font-medium rounded-lg transition-colors cursor-not-allowed opacity-60">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800 font-medium rounded-lg transition-colors cursor-not-allowed opacity-60">
            <Shield className="w-4 h-4" /> Security
          </button>
        </div>

        {/* Main Settings Form */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Card className="border-none shadow-md bg-white dark:bg-slate-900/50 overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
                Public Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={formData.avatar} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-full border-4 border-[#9F915A]/20 bg-[#E0EEC6] object-cover transition-transform group-hover:scale-105"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Avatar"; }}
                    />
                    <div className="absolute inset-0 bg-black/40 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-[10px] font-bold uppercase">Change</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5 block">Avatar URL</label>
                    <Input 
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-[#9F915A]"
                      placeholder="https://..."
                    />
                    <p className="text-xs text-slate-500 mt-1.5">Provide a link to an image to update your avatar.</p>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-100 dark:bg-slate-800"></div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Display Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-[#9F915A]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-900 dark:text-white">Email Address</label>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-[#9F915A]"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-2">
                  {saved && <span className="text-sm font-bold text-green-600 dark:text-green-400 animate-in fade-in">✓ Saved successfully</span>}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#9F915A] hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-xl disabled:opacity-50 transition-all shadow-md active:scale-[0.98]"
                  >
                    {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                  </button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
