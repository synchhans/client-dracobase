import { useState } from "react";
import { User } from "../types/user.types";

export default function useLoginFormSubmit(
  initialUser: User | null | undefined,
  type: string,
  handleUpdateUser: (userData: User, type: string) => Promise<void>
) {
  const [firstName, setFirstName] = useState(initialUser?.firstName || "");
  const [lastName, setLastName] = useState(initialUser?.lastName || "");
  const [role, setRole] = useState(initialUser?.role || "");
  const [plan, setPlan] = useState(initialUser?.plan || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    if (!firstName || !lastName || !role || !plan) {
      return;
    }

    if (!firstName || !lastName || !role || !plan) {
      setError("Semua field harus diisi.");
      return;
    }

    if (!initialUser) {
      setError("Data user tidak tersedia.");
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

  if (!initialUser) {
    console.error("Initial user data is missing or invalid.");
    return {
      isLoading: false,
      error: "User data is missing",
      firstName: "",
      lastName: "",
      role: "",
      plan: "",
      handleSubmit: () => {},
      setFirstName: () => {},
      setLastName: () => {},
      setRole: () => {},
      setPlan: () => {},
    };
  }

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
