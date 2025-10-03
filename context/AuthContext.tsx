"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "freelancer" | "client";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  role: Role;
  login: (user: User, role: Role) => void;
  logout: () => void;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    name: "Pratham",
    email: "pratham@example.com",
  });
  const [role, setRole] = useState<Role>("freelancer");

  const login = (user: User, role: Role) => {
    setUser(user);
    setRole(role);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = () => {
    setRole((prev) => (prev === "freelancer" ? "client" : "freelancer"));
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, switchRole }}>
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
