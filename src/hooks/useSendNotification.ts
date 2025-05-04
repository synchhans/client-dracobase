import { createNotification } from "@/app/api/notification";
import { NotificationType } from "@/types/notification.type";
import { useState } from "react";

export const useSendNotification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendNotification = async (
    userIds: string[],
    title: string,
    message: string,
    type: NotificationType
  ) => {
    setLoading(true);
    setError(null);

    try {
      const results = [];

      const result = await createNotification({
        userIds,
        title,
        message,
        type,
      });
      results.push(result);

      setLoading(false);
      return {
        success: true,
        message: `${userIds.length} notifikasi berhasil dikirim.`,
        data: results,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        const errorMessage =
          err.message || "Gagal mengirim notifikasi ke beberapa pengguna.";
        setError(errorMessage);
        setLoading(false);
        return {
          success: false,
          message: errorMessage,
          error: errorMessage,
        };
      }
    }
  };

  return {
    loading,
    error,
    sendNotification,
  };
};
