import { useState } from "react";
import { useNotifications } from "@/hooks/useNotification";
import { FiInfo } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import NotificationDetailModal from "./NotificationDetailModal";
import { AppNotification } from "@/types/notification.type";

export default function NotificationPanel() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const [selectedNotif, setSelectedNotif] = useState<AppNotification | null>(
    null
  );

  const handleOpenDetail = (notif: any) => {
    setSelectedNotif(notif);
  };

  const handleCloseDetail = () => {
    setSelectedNotif(null);
  };

  return (
    <>
      <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-fade-in">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-800">Notifikasi</h3>

          {unreadCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                markAllAsRead();
              }}
              className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-all"
            >
              Tandai Semua Dibaca
            </button>
          )}
        </div>

        <div className="max-h-64 overflow-y-auto divide-y divide-gray-100">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className={`flex items-start gap-x-3 p-3 transition-all duration-200 cursor-pointer ${
                  !notif.read ? "bg-gray-50 hover:bg-blue-50" : "opacity-80"
                }`}
                onClick={() => {
                  markAsRead(notif._id);
                  handleOpenDetail(notif);
                }}
              >
                <div className="flex-shrink-0 my-auto">
                  {notif.type === "system" ? (
                    <FiInfo
                      className={`h-5 w-5 ${
                        !notif.read ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                  ) : (
                    <FaCrown
                      className={`h-5 w-5 ${
                        !notif.read ? "text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-sm font-medium ${
                      !notif.read ? "text-gray-900" : "text-gray-600"
                    } truncate`}
                  >
                    {notif.title}
                  </h4>
                  <p
                    className={`text-xs line-clamp-2 ${
                      !notif.read
                        ? "text-gray-700 font-normal"
                        : "text-gray-500"
                    }`}
                  >
                    {notif.message}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`-ml-1 text-[9px] font-medium px-2 py-0.5 rounded-full ${
                        notif.type === "system"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {notif.type === "system" ? "System" : "Master"}
                    </span>
                    <span className="text-[9px] text-gray-400 ml-2 truncate">
                      {new Date(notif.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-red-500 my-auto"></div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              Tidak ada notifikasi.
            </div>
          )}
        </div>
      </div>

      {selectedNotif && (
        <NotificationDetailModal
          isOpen={!!selectedNotif}
          onClose={handleCloseDetail}
          title={selectedNotif.title}
          message={selectedNotif.message}
          type={selectedNotif.type}
          createdAt={selectedNotif.createdAt}
        />
      )}
    </>
  );
}
