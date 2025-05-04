import { useState, useRef, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationPanel from "./NotificationPanel";
import { useNotifications } from "@/hooks/useNotification";

export default function NotificationButton({ id3 }: { id3?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        className="cursor-pointer hover:bg-gray-200 rounded-sm p-1.5 relative"
        onClick={() => setIsOpen(!isOpen)}
        id={id3}
      >
        <IoMdNotificationsOutline className="text-xl" />

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && <NotificationPanel />}
    </div>
  );
}
