import { useEffect, useState } from "react";
import { getDataAi, sendQueryToBackend } from "@/app/api/ai";

interface DebugData {
  debugLogs: string;
}

export const useDebugging = (
  workspaceId: string,
  materialId: string,
  contentBlockId: string
) => {
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [isDebuggerVisible, setIsDebuggerVisible] = useState(false);
  const [isDebugLoading, setIsDebugLoading] = useState(false);

  useEffect(() => {
    const fetchExistingDebugData = async () => {
      try {
        const response = await getDataAi({
          workspaceId,
          materialId,
          contentBlockId,
          type: "debugging",
        });

        if (response?.success && response.data?.length > 0) {
          const latestDebugEntry = response.data[0];
          if (latestDebugEntry) {
            setDebugData({
              debugLogs: latestDebugEntry.response,
            });
            setIsDebuggerVisible(true);
          }
        } else {
          console.log("Tidak ada data debugging tersimpan untuk blok ini.");
        }
      } catch (error) {}
    };

    fetchExistingDebugData();
  }, [materialId, contentBlockId]);

  const handleDebug = async ({ code }: { code: string }) => {
    setIsDebugLoading(true);
    try {
      const result = await sendQueryToBackend({
        query: code,
        workspaceId,
        materialId,
        contentBlockId,
        type: "debugging",
      });

      const parsedDebugData: DebugData = parseDebugResponse(
        result.data.response
      );

      setDebugData(parsedDebugData);
      setIsDebuggerVisible(true);
    } catch (error: any) {
      console.error("Error fetching debug data:", error);
      alert(error.message || "Gagal mendapatkan hasil debugging.");
    } finally {
      setIsDebugLoading(false);
    }
  };

  const parseDebugResponse = (responseContent: string): DebugData => {
    return {
      debugLogs: responseContent,
    };
  };

  return {
    debugData,
    isDebuggerVisible,
    isDebugLoading,
    handleDebug,
    setIsDebuggerVisible,
  };
};
