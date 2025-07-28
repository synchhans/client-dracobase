export type NotificationType = "system" | "master" | "dosen";

export interface AppNotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  readAt: string | null;
  type: NotificationType;
  relatedId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationApiResponse {
  success: boolean;
  data: AppNotification[];
}
