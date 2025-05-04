import { apiDeleteRecent, apiGetRecents } from "@/app/api/recent";
import { Recent } from "@/types/recent.types";
import { useEffect, useState } from "react";

export default function useRecent() {
  const [recents, setRecents] = useState<Recent[]>([]);

  const fetchrecents = async () => {
    try {
      const data = await apiGetRecents();
      setRecents(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message || "Gagal mengambil bahasa.");
      }
    }
  };

  const addRecent = (newRecent: Recent) => {
    setRecents((prev) => [newRecent, ...prev]);
  };

  const deleteRecent = async (recentId: string) => {
    try {
      await apiDeleteRecent(recentId);
      setRecents((prevRecents) =>
        prevRecents.filter((recent) => recent.id !== recentId)
      );
    } catch (error) {
      console.error("Error deleting recent:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchrecents();
  }, []);

  return {
    recents,
    deleteRecent,
    addRecent,
  };
}
