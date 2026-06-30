"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedUser = localStorage.getItem("activeUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    }
  }, []);

  const login = (email, password) => {
    // In a real app, this would verify with a database
    // For this mock presentation, if the user exists in localStorage, log them in.
    // If not, we just log them in anyway to avoid presentation hiccups.
    try {
      const usersData = localStorage.getItem("allUsers") || "[]";
      const allUsers = JSON.parse(usersData);
      
      let existingUser = allUsers.find(u => u.email === email);
      
      if (!existingUser) {
        // If they don't exist, create a mock profile for them instantly
        existingUser = {
          id: crypto.randomUUID(),
          name: email.split("@")[0],
          email: email,
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
        };
        allUsers.push(existingUser);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
      }
      
      setUser(existingUser);
      localStorage.setItem("activeUser", JSON.stringify(existingUser));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const signup = (name, email, password) => {
    try {
      const usersData = localStorage.getItem("allUsers") || "[]";
      const allUsers = JSON.parse(usersData);
      
      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
      };
      
      allUsers.push(newUser);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      
      setUser(newUser);
      localStorage.setItem("activeUser", JSON.stringify(newUser));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("activeUser");
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("activeUser", JSON.stringify(updatedUser));
    
    // Also update in allUsers array
    try {
      const usersData = localStorage.getItem("allUsers") || "[]";
      const allUsers = JSON.parse(usersData);
      const index = allUsers.findIndex(u => u.email === user.email);
      if (index !== -1) {
        allUsers[index] = updatedUser;
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Don't render children until mounted to prevent hydration mismatches
  if (!mounted) return null;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
