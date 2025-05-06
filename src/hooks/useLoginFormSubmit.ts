import { useState } from "react";
import { User } from "../types/user.types";

export default function useLoginFormSubmit(
  initialUser: User,
  type: string,
  handleUpdateUser: (userData: User, type: string) => Promise<void>
) {
  const [firstName, setFirstName] = useState(initialUser.firstName || "");
  const [lastName, setLastName] = useState(initialUser.lastName || "");
  const [role, setRole] = useState(initialUser.role || "");
  const [plan, setPlan] = useState(initialUser.plan || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!firstName || !lastName || !role || !plan) {
      return;
    }

    try {
      await handleUpdateUser(
        {
          ...initialUser,
          firstName,
          lastName,
          role,
          plan,
        },
        type
      );
    } catch (error) {
      setError((error as Error).message || "Error updating user");
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    role,
    setRole,
    plan,
    setPlan,
    handleSubmit,
  };
}
