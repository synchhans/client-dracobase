import { AppNotification, NotificationType } from "@/types/notification.type";

const NOTIFICATION_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/notification`;

export const fetchUserNotifications = async (): Promise<{
  success: boolean;
  data: AppNotification[];
}> => {
  try {
    const response = await fetch(NOTIFICATION_API_URL, {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengambil notifikasi.");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Respons bukan JSON valid.");
    }
  } catch (err: any) {
    throw new Error(
      err.message || "Terjadi kesalahan saat mengambil notifikasi."
    );
  }
};

export const createNotification = async ({
  userIds,
  title,
  message,
  type,
}: {
  userIds: string[];
  title: string;
  message: string;
  type: NotificationType;
}): Promise<any> => {
  const res = await fetch(NOTIFICATION_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ userIds, title, message, type }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Gagal mengirim notifikasi.");
  }

  return await res.json();
};

export const markNotificationAsRead = async (
  notificationId: string
): Promise<{ success: boolean; data: any }> => {
  try {
    const response = await fetch(
      `${NOTIFICATION_API_URL}/${notificationId}/read`,
      {
        method: "PATCH",
        credentials: "include" as RequestCredentials,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Gagal menandai notifikasi sebagai dibaca."
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      return result;
    } else {
      throw new Error("Respons bukan JSON valid.");
    }
  } catch (err: any) {
    throw new Error(
      err.message || "Terjadi kesalahan saat menandai notifikasi."
    );
  }
};
