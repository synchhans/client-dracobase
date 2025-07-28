import { NotificationType } from "@/types/notification.type";
import { getNotificationAttributes } from "@/utils/notificationUtils";

interface NotificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
}

export default function NotificationDetailModal({
  isOpen,
  onClose,
  title,
  message,
  type,
  createdAt,
}: NotificationDetailModalProps) {
  if (!isOpen) return null;

  const { Icon, iconColor, bgColor, textColor, label } =
    getNotificationAttributes(type);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 backdrop-brightness-50 bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden z-50 max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Detail Notifikasi
          </h3>
        </div>

        <div className="p-5 flex-1 overflow-y-auto">
          <div className="flex items-start gap-x-4">
            <div className="flex-shrink-0 mt-1">
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2 ${bgColor} ${textColor}`}
              >
                Pesan dari {label}
              </span>
              <h4 className="text-base font-bold text-gray-900 break-words">
                {title}
              </h4>
              <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap break-words">
                {message}
              </p>
              <p className="text-xs text-gray-400 mt-4">
                Dikirim pada: {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
