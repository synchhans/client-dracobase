import { fetchUser, updateUser } from "@/app/api/auth";
import { User } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

export default function useGuest(isRedirect: boolean = true) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const userData = await fetchUser();

      if (!userData) {
        setUser(null);
        return;
      }

      const { isProfileComplete: profileComplete } = userData;

      if (profileComplete) {
        setIsProfileComplete(true);

        if (
          window.location.pathname !== "/dashboard" &&
          window.location.pathname !== "/setting"
        ) {
          router.push("/dashboard");
        }
        return;
      }

      setUser(userData);
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdateUser = async (userData: User) => {
    setIsLoading(true);
    try {
      await updateUser(userData);
      toast.success("Profile updated successfully");
      if (isRedirect) {
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`;
      }else{
        window.location.reload();
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    isLoading,
    error,
    fetchUser: fetchUserData,
    handleUpdateUser,
    refetchUser: fetchUserData,
    isProfileComplete,
  };
}
