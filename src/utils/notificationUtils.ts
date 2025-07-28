import { NotificationType } from "@/types/notification.type";
import { FaCrown, FaChalkboardTeacher } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { IconType } from "react-icons";

interface NotificationAttributes {
  Icon: IconType;
  iconColor: string;
  bgColor: string;
  textColor: string;
  label: string;
}

export const getNotificationAttributes = (
  type: NotificationType
): NotificationAttributes => {
  switch (type) {
    case "dosen":
      return {
        Icon: FaChalkboardTeacher,
        iconColor: "text-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        label: "Dosen",
      };
    case "master":
      return {
        Icon: FaCrown,
        iconColor: "text-yellow-500",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        label: "Master",
      };
    case "system":
    default:
      return {
        Icon: FiInfo,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        label: "System",
      };
  }
};
