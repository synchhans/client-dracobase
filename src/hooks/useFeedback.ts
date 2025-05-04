import { useEffect, useState } from "react";
import { getDataAi, sendQueryToBackend } from "@/app/api/ai";
import { toast } from "react-toastify";

interface AIFeedbackData {
  query: string;
  response: string;
}

export const useFeedback = (
  workspaceId: string,
  materialId: string,
  contentBlockId: string
) => {
  const [aiFeedback, setAIFeedback] = useState<AIFeedbackData | null>(null);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);

  useEffect(() => {
    const fetchExistingFeedbackData = async () => {
      try {
        const response = await getDataAi({
          workspaceId,
          materialId,
          contentBlockId,
          type: "feedback",
        });

        if (response?.success && response.data?.length > 0) {
          const latestFeedbackEntry = response.data[0];
          if (latestFeedbackEntry) {
            setAIFeedback({
              query: latestFeedbackEntry.query,
              response: latestFeedbackEntry.response,
            });
            setIsFeedbackVisible(true);
          }
        } else {
          console.log("Tidak ada data feedback tersimpan untuk blok ini.");
        }
      } catch (error: unknown) {
        console.log(error);
      }
    };

    fetchExistingFeedbackData();
  }, [materialId, contentBlockId, workspaceId]);

  const handleFeedback = async ({ code }: { code: string }) => {
    setIsAILoading(true);
    try {
      const result = await sendQueryToBackend({
        query: code,
        workspaceId,
        materialId,
        contentBlockId,
        type: "feedback",
      });

      const feedbackData: AIFeedbackData = {
        query: code,
        response: result.data.response,
      };

      setAIFeedback(feedbackData);
      setIsFeedbackVisible(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Gagal mendapatkan feedback AI.");
      }
    } finally {
      setIsAILoading(false);
    }
  };

  return {
    aiFeedback,
    isFeedbackVisible,
    isAILoading,
    handleFeedback,
    setIsFeedbackVisible,
  };
};
