"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireProfileCompletion?: boolean;
  requiredRole?: "freelancer" | "client";  // If specified, only this role can access
}

export function ProtectedRoute({
  children,
  requireProfileCompletion = true,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, profileCompleted, user } = useAuth();

  useEffect(() => {
    // Not authenticated - redirect to login
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Authenticated but no user data
    if (!user) {
      router.push("/login");
      return;
    }

    // Check if user has required role
    if (requiredRole && user.role !== requiredRole) {
      router.push("/dashboard");
      return;
    }

    // Profile completion required but not completed
    if (requireProfileCompletion && !profileCompleted) {
      router.push("/onboarding/profile");
      return;
    }
  }, [isAuthenticated, profileCompleted, user, router, requireProfileCompletion, requiredRole]);

  // Render children only if authenticated and all requirements met
  if (!isAuthenticated) return null;

  if (requiredRole && user?.role !== requiredRole) return null;

  if (requireProfileCompletion && !profileCompleted) return null;

  return <>{children}</>;
}
