import React, { useState, useEffect } from "react";
import { User } from "@/types/user.types";
import { NotificationType } from "@/types/notification.type";
import { useAuth } from "@/hooks/useAuth";

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  onSendNotification: (
    userIds: string[],
    title: string,
    message: string,
    type: NotificationType
  ) => void;
  preSelectedUserIds?: string[];
  defaultType?: NotificationType;
}

export default function SendNotificationModal({
  isOpen,
  onClose,
  users,
  onSendNotification,
  preSelectedUserIds = [],
  defaultType,
}: SendNotificationModalProps) {
  const { user: loggedInUser } = useAuth();

  const initialType = defaultType || "master";

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>(initialType);

  useEffect(() => {
    if (isOpen) {
      const initialTypeOnOpen = defaultType || "master";
      setType(initialTypeOnOpen);
      setTitle("");
      setMessage("");

      if (initialTypeOnOpen === "system") {
        setSelectedUserIds(users.map((u) => u._id));
      } else if (initialTypeOnOpen === "dosen") {
        setSelectedUserIds(preSelectedUserIds);
      } else {
        setSelectedUserIds([]);
      }
    }
  }, [isOpen, defaultType, preSelectedUserIds, users]);
  useEffect(() => {
    if (!isOpen) return;

    if (type === "system") {
      setSelectedUserIds(users.map((u) => u._id));
    } else {
      if (selectedUserIds.length === users.length) {
        setSelectedUserIds([]);
      }
    }
  }, [type, isOpen, users, setSelectedUserIds, selectedUserIds.length]);
  if (!isOpen) return null;

  const handleSelectUser = (userId: string) => {
    if (type === "system") return;
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };
  const handleSelectAll = () => {
    if (selectedUserIds.length === users.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((user) => user._id));
    }
  };
  const handleSubmit = () => {
    if (!title.trim() || !message.trim()) {
      alert("Judul dan pesan wajib diisi");
      return;
    }
    if (selectedUserIds.length === 0) {
      alert("Pilih minimal satu pengguna");
      return;
    }
    onSendNotification(selectedUserIds, title, message, type);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-contrast-50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Kirim Notifikasi Masal
          </h3>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Notifikasi
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as NotificationType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loggedInUser?.level === "admin" && (
                <>
                  <option value="master">Master</option>
                  <option value="system">Sistem</option>
                </>
              )}
              {loggedInUser?.level === "dosen" && (
                <option value="dosen">Pesan Dosen</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul notifikasi"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pesan
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Masukkan isi pesan notifikasi"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Pilih Pengguna
              </label>
              {type !== "system" && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  {selectedUserIds.length === users.length
                    ? "Batal Pilih Semua"
                    : "Pilih Semua"}
                </button>
              )}
            </div>
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2">
              {users.map((user) => (
                <div key={user._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`user-${user._id}`}
                    checked={selectedUserIds.includes(user._id)}
                    onChange={() => handleSelectUser(user._id)}
                    disabled={type === "system"}
                    className={`h-4 w-4 rounded ${
                      type === "system"
                        ? "cursor-not-allowed opacity-50"
                        : "text-blue-600 focus:ring-blue-500 border-gray-300"
                    }`}
                  />
                  <label
                    htmlFor={`user-${user._id}`}
                    className={`ml-2 block text-sm ${
                      type === "system"
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 cursor-pointer"
                    }`}
                  >
                    {user.displayName} ({user.email})
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Kirim Notifikasi
          </button>
        </div>
      </div>
    </div>
  );
}
