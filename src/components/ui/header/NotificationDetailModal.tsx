import { FaCrown } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

interface NotificationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "system" | "master";
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

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-contrast-50 bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden z-30 mx-4 max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Detail Notifikasi
          </h3>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-start gap-x-3 mb-4">
            <div className="flex-shrink-0 my-auto">
              {type === "system" ? (
                <FiInfo className="h-6 w-6 text-blue-500" />
              ) : (
                <FaCrown className="h-6 w-6 text-yellow-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-700 mt-2">{message}</p>
              <span
                className={`mt-2 inline-block text-xs px-2 py-0.5 rounded ${
                  type === "system"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {type === "system" ? "System" : "Master"}
              </span>
              <p className="text-xs text-gray-400 mt-1">
                Dikirim pada: {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
