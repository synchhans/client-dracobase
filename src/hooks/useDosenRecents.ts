import { useState, useEffect, useCallback } from "react";
import { apiGetDosenRecents } from "@/app/api/dosen";
import { DosenRecentItem } from "@/types/dosen.types";
import { toast } from "react-toastify";

export function useDosenRecents() {
  const [recents, setRecents] = useState<DosenRecentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGetDosenRecents();
      setRecents(data);
      setError(null);
    } catch (err) {
      const msg = (err as Error).message;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecents();
  }, [fetchRecents]);

  return { recents, loading, error, refetch: fetchRecents };
}