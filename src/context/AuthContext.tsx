"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import {
  authAPI,
  clearSession,
  getStoredUser,
  normalizeApiError,
  storeSession,
} from "@/services/apiService";
import { ACCESS_TOKEN } from "@/tokens";

type Role = "freelancer" | "client";

type MarketplaceUser = {
  id: string;
  email: string;
  role: Role;
  account_status?: string;
  email_verified?: boolean;
  face_verified?: boolean;
  phone_verified?: boolean;
  identity_verified?: boolean;
  is_restricted?: boolean;
  full_name?: string;
  company_name?: string;
  [key: string]: any;
};

type MarketplaceProfile = {
  id?: string;
  full_name?: string;
  profile_photo_url?: string;
  company_name?: string;
  city?: string;
  country?: string;
  description?: string;
  internal_contact_info?: string;
  preferred_communication_method?: string;
  typical_response_time_hours?: number;
  username?: string;
  timezone?: string;
  languages_spoken?: string[];
  professional_title?: string;
  bio?: string;
  experience_level?: string;
  years_of_experience?: number;
  categories?: string[];
  portfolio_url?: string;
  portfolio_items?: any[];
  hourly_rate?: number;
  fixed_project_rate?: number;
  availability?: string;
  working_hours?: string;
  work_history?: any[];
  education?: any[];
  certifications?: any[];
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
  selected_skill_slugs?: string[];
  verification?: Record<string, any>;
  client_activity?: Record<string, any>;
  client_credibility?: Record<string, any>;
  system_metrics?: Record<string, any>;
  reviews?: any[];
  badges?: string[];
  is_complete?: boolean;
  completion_percentage?: number;
  missing_requirements?: string[];
  [key: string]: any;
};

type WorkflowState = {
  profile_completed?: boolean;
  selected_skills_count?: number;
  passed_skills_count?: number;
  marketplace_access?: boolean;
  can_post_jobs?: boolean;
  can_bid?: boolean;
  can_pay?: boolean;
  next_step?: string;
  [key: string]: any;
};

type AuthContextType = {
  user: MarketplaceUser | null;
  profile: MarketplaceProfile | null;
  workflow: WorkflowState | null;
  role: Role | null;
  isAuthenticated: boolean;
  profileCompleted: boolean;
  loading: boolean;
  error: string | null;
  login: (user: MarketplaceUser, accessToken: string, refreshToken?: string | null) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (profile: MarketplaceProfile, workflow?: WorkflowState | null) => void;
  switchRole: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MarketplaceUser | null>(getStoredUser());
  const [profile, setProfile] = useState<MarketplaceProfile | null>(null);
  const [workflow, setWorkflow] = useState<WorkflowState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = Boolean(user);
  const profileCompleted = Boolean(workflow?.profile_completed || profile?.is_complete);
  const role = user?.role ?? null;

  const refreshSession = useCallback(async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setLoading(false);
      setUser(null);
      setProfile(null);
      setWorkflow(null);
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.fetchMe();
      const nextUser = response.data.user;
      setUser(nextUser);
      setProfile(response.data.profile ?? null);
      setWorkflow(response.data.workflow ?? null);
      storeSession(token, null, nextUser);
      setError(null);
    } catch (sessionError) {
      clearSession();
      setUser(null);
      setProfile(null);
      setWorkflow(null);
      setError(normalizeApiError(sessionError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (nextUser: MarketplaceUser, accessToken: string, refreshToken?: string | null) => {
    storeSession(accessToken, refreshToken ?? null, nextUser);
    setUser(nextUser);
    setLoading(true);
    await refreshSession();
  }, [refreshSession]);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    setProfile(null);
    setWorkflow(null);
    setError(null);
  }, []);

  const updateProfile = useCallback((nextProfile: MarketplaceProfile, nextWorkflow?: WorkflowState | null) => {
    setProfile(nextProfile);
    if (nextWorkflow) {
      setWorkflow(nextWorkflow);
    }
  }, []);

  const switchRole = useCallback(() => {
    // Accounts are single-role; this exists only for compatibility with older components.
  }, []);

  const value: AuthContextType = {
    user,
    profile,
    workflow,
    role,
    isAuthenticated,
    profileCompleted,
    loading,
    error,
    login,
    logout,
    refreshSession,
    checkAuth: refreshSession,
    updateProfile,
    switchRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
