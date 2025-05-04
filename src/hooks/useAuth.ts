import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.types";
import { logout, verifyUser } from "@/app/api/auth";

export const useAuth = (shouldRedirect: boolean = true) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const userData = await verifyUser();

      if (!userData) {
        if (shouldRedirect) {
          router.push("/login");
        }
        return;
      }

      setIsAuthorized(true);
      setUser(userData);
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [router, shouldRedirect]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();

      setUser(null);
      setIsAuthorized(false);
      setError(null);

      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      setError((err as Error).message || "Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return { user, isLoading, isAuthorized, handleLogout, error };
};
