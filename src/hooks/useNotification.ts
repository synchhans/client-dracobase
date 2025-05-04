import useSWR, { mutate } from "swr";
import {
  fetchUserNotifications,
  markNotificationAsRead,
} from "@/app/api/notification";
import { AppNotification } from "@/types/notification.type";

interface UseNotificationsReturn {
  notifications: AppNotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  markAsRead: (notifId: string) => Promise<void>;
  markAllAsRead: () => void;
}

export const useNotifications = (): UseNotificationsReturn => {
  const {
    data,
    error: fetchError,
    isLoading,
  } = useSWR("/api/notifications", fetchUserNotifications);

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = async (notifId: string) => {
    try {
      await markNotificationAsRead(notifId);
      await mutate("/api/notifications");
    } catch (err) {
      console.error("Gagal tandai notifikasi sebagai dibaca:", err);
    }
  };

  const handleMarkAllAsRead = () => {
    notifications
      .filter((notif) => !notif.read)
      .forEach((notif) => handleMarkAsRead(notif._id));
  };

  return {
    notifications,
    unreadCount,
    loading: isLoading,
    error: fetchError ? "Gagal mengambil notifikasi" : null,
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
  };
};
