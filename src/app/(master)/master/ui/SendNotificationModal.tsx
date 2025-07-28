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
  defaultType = "master",
}: SendNotificationModalProps) {
  const { user: loggedInUser } = useAuth();

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>(defaultType);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setMessage("");

      setType(defaultType);

      setSelectedUserIds(preSelectedUserIds);
    }
  }, [isOpen, defaultType, preSelectedUserIds]);

  useEffect(() => {
    if (type === "system") {
      setSelectedUserIds(users.map((user) => user._id));
    }
  }, [type, users]);

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
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Kirim Notifikasi
          </h3>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Notifikasi
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as NotificationType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {loggedInUser?.level === "dosen" && (
                <option value="dosen">Pesan Dosen</option>
              )}

              {loggedInUser?.level === "admin" && (
                <>
                  <option value="master">Pesan Master</option>
                  <option value="system">Pesan Sistem (ke semua)</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="notif-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Judul
            </label>
            <input
              id="notif-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul notifikasi"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="notif-message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pesan
            </label>
            <textarea
              id="notif-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Masukkan isi pesan notifikasi"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Penerima ({selectedUserIds.length} terpilih)
              </label>
              {type !== "system" && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-blue-600 hover:text-blue-800"
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
                    className="h-4 w-4 rounded"
                  />
                  <label
                    htmlFor={`user-${user._id}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {user.displayName}
                  </label>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-sm text-gray-500 text-center p-2">
                  Tidak ada pengguna yang bisa dipilih.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 mt-auto border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
