import {
  apiDeleteAccount,
  apiEditAccount,
  apiGetAccounts,
} from "@/app/api/account";
import { User } from "@/types/user.types";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function useAccount() {
  const [accounts, setAccounts] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await apiGetAccounts();
      if (data) {
        setAccounts(Array.isArray(data) ? data : [data]);
      } else {
        setAccounts([]);
      }
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Gagal mengambil account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const editAccount = async (id: string, level: string) => {
    try {
      await apiEditAccount(id, level);
      setAccounts((prevAccounts) => {
        if (!prevAccounts) return null;
        return prevAccounts.map((account) =>
          account._id === id ? { ...account, level } : account
        );
      });
      toast.success("Account updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to update account.");
      }
    }
  };

  const deleteAccount = async (id: string) => {
    try {
      await apiDeleteAccount(id);
      setAccounts((prevAccounts) => {
        if (!prevAccounts) return null;
        return prevAccounts.filter((account) => account._id !== id);
      });
      toast.success("Account deleted successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to delete account.");
      }
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    accounts,
    loading,
    error,
    refetch: fetchAccounts,
    editAccount,
    deleteAccount,
  };
}
