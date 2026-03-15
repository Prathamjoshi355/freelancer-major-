"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = "freelancer" | "client";

interface User {
  id?: string;
  email: string;
  full_name?: string;
  company_name?: string;
  role: Role;
}

interface Profile {
  completed: boolean;
  bio?: string;
  skills?: string[];
  hourly_rate?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  profileCompleted: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => void;
  updateProfile: (profile: Profile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("access_token");
      const userData = localStorage.getItem("user_data");
      const profileStatus = localStorage.getItem("profile_completed");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setProfileCompleted(profileStatus === "true");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      logout();
    }
  };

  const login = (loginUser: User, token: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_data", JSON.stringify(loginUser));
    localStorage.setItem("profile_completed", "false");
    setUser(loginUser);
    setIsAuthenticated(true);
    setProfileCompleted(false);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("profile_completed");
    setUser(null);
    setIsAuthenticated(false);
    setProfileCompleted(false);
  };

  const updateProfile = (profile: Profile) => {
    if (profile.completed) {
      localStorage.setItem("profile_completed", "true");
      setProfileCompleted(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        profileCompleted,
        login,
        logout,
        checkAuth,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
