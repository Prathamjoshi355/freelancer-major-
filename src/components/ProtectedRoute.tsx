"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireProfileCompletion?: boolean;
}

export function ProtectedRoute({
  children,
  requireProfileCompletion = true,
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

    // Profile completion required but not completed
    if (requireProfileCompletion && !profileCompleted) {
      if (user.role === "freelancer") {
        router.push("/freelancer/profile/edit");
      } else if (user.role === "client") {
        router.push("/client/profile/edit");
      }
      return;
    }
  }, [isAuthenticated, profileCompleted, user, router, requireProfileCompletion]);

  // Render children only if authenticated and profile requirements met
  if (!isAuthenticated) return null;

  if (requireProfileCompletion && !profileCompleted) return null;

  return <>{children}</>;
}
