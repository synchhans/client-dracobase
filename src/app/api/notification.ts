import { AppNotification, NotificationType } from "@/types/notification.type";

const NOTIFICATION_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/notification`;

export const fetchUserNotifications = async (): Promise<{
  success: boolean;
  data: AppNotification[];
}> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengambil data notification.");
    }
    const response = await fetch(NOTIFICATION_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        err.message || "Terjadi kesalahan saat mengambil notifikasi."
      );
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat mengambil notifikasi."
      );
    }
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
}): Promise<AppNotification> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Gagal membuat data notification.");
  }
  const res = await fetch(NOTIFICATION_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
): Promise<{ success: boolean; data: AppNotification }> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal menandai notifikasi sebagai dibaca.");
    }
    const response = await fetch(
      `${NOTIFICATION_API_URL}/${notificationId}/read`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        err.message || "Terjadi kesalahan saat menandai notifikasi."
      );
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat menandai notifikasi."
      );
    }
  }
};
