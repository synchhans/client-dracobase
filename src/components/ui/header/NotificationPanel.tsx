import { useState } from "react";
import { useNotifications } from "@/hooks/useNotification";
import NotificationDetailModal from "./NotificationDetailModal";
import { AppNotification } from "@/types/notification.type";
import { getNotificationAttributes } from "@/utils/notificationUtils"; 

export default function NotificationPanel() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [selectedNotif, setSelectedNotif] = useState<AppNotification | null>(null);

  const handleOpenDetail = (notif: AppNotification) => setSelectedNotif(notif);
  const handleCloseDetail = () => setSelectedNotif(null);

  return (
    <>
      <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in">
        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-800">Notifikasi</h3>
          {unreadCount > 0 && (
            <button onClick={(e) => { e.stopPropagation(); markAllAsRead(); }} className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50">
              Tandai Semua Dibaca
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
          {notifications.length > 0 ? (
            notifications.map((notif) => {
              const { Icon, iconColor, bgColor, textColor, label } = getNotificationAttributes(notif.type);
              const unreadIconColor = iconColor;
              const readIconColor = "text-gray-400";

              return (
                <div
                  key={notif._id}
                  className={`flex items-start gap-x-3 p-3 transition-all duration-200 cursor-pointer ${!notif.read ? "bg-white hover:bg-gray-50" : "bg-gray-50 opacity-70"}`}
                  onClick={() => { markAsRead(notif._id); handleOpenDetail(notif); }}
                >
                  <div className="flex-shrink-0 pt-1">
                    <Icon className={`h-5 w-5 ${!notif.read ? unreadIconColor : readIconColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium ${!notif.read ? "text-gray-900" : "text-gray-600"} truncate`}>
                      {notif.title}
                    </h4>
                    <p className={`text-xs line-clamp-2 ${!notif.read ? "text-gray-700" : "text-gray-500"}`}>
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${bgColor} ${textColor}`}>
                        {label}
                      </span>
                      <span className="text-[10px] text-gray-400 ml-2 truncate">
                        {new Date(notif.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-500 self-center"></div>}
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">Tidak ada notifikasi.</div>
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