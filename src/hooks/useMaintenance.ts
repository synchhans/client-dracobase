import { useState, useEffect } from "react";
import {
  apiGetMaintenanceStatus,
  apiToggleMaintenance,
} from "@/app/api/maintenance";
import { toast } from "react-toastify";

type UseMaintenanceReturn = {
  isMaintenance: boolean;
  isLoading: boolean;
  message: string | null;
  toggleMaintenance: () => Promise<void>;
};

export default function useMaintenance(): UseMaintenanceReturn {
  const [isMaintenance, setIsMaintenance] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const data = await apiGetMaintenanceStatus();
        setIsMaintenance(!!data.enabled);
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
          setIsMaintenance(false);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchStatus();
  }, []);

  const toggleMaintenance = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      await apiToggleMaintenance(!isMaintenance);

      const updatedData = await apiGetMaintenanceStatus();

      setIsMaintenance(!!updatedData.enabled);
      setMessage("Berhasil memperbarui status.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message || "Gagal memperbarui status.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isMaintenance,
    isLoading,
    message,
    toggleMaintenance,
  };
}
