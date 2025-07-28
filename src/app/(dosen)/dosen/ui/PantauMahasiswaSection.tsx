import { useState } from "react";
import { usePantauMahasiswa } from "@/hooks/usePantauMahasiswa";
import { useSendNotification } from "@/hooks/useSendNotification";
import { NotificationType } from "@/types/notification.type";
import { User } from "@/types/user.types";
import { toast } from "react-toastify";
import SendNotificationModal from "@/app/(master)/master/ui/SendNotificationModal";
import WorkspaceFilterBar from "./WorkspaceFilterBar";
import WorkspaceList from "./WorkspaceList";

export default function PantauMahasiswaSection() {
  const {
    workspaces,
    pagination,
    loading,
    error,
    refetch,
    filters,
    paginationControl,
  } = usePantauMahasiswa();

  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sendNotification, loading: notificationLoading } =
    useSendNotification();

  const handleSendNotification = async (
    userIds: string[],
    title: string,
    message: string,
    type: NotificationType
  ) => {
    const result = await sendNotification(userIds, title, message, type);
    if (result?.success) {
      toast.success(result.message);
      setIsModalOpen(false);
      setSelectedUserIds(new Set());
    } else {
      toast.error(result?.message || "Gagal mengirim notifikasi.");
    }
  };

  const selectedUsersForModal = Array.from(selectedUserIds)
    .map((userId) => {
      const wsData = workspaces.find((ws) => ws.mahasiswa._id === userId);
      return wsData
        ? ({
            _id: wsData.mahasiswa._id,
            displayName: wsData.mahasiswa.displayName,
            email: wsData.mahasiswa.email,
          } as User)
        : null;
    })
    .filter(Boolean) as User[];

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Pantau Aktivitas Mahasiswa
      </h2>

      <div className="bg-white p-4 rounded-lg space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <WorkspaceFilterBar filters={filters} />
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
            onClick={() => setIsModalOpen(true)}
            disabled={selectedUserIds.size === 0 || notificationLoading}
          >
            {notificationLoading
              ? "Mengirim..."
              : `Kirim Notifikasi (${selectedUserIds.size})`}
          </button>
        </div>

        <WorkspaceList
          workspaces={workspaces}
          loading={loading}
          error={error}
          refetch={refetch}
          selectedUserIds={selectedUserIds}
          setSelectedUserIds={setSelectedUserIds}
        />

        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-4">
            <button
              onClick={() =>
                paginationControl.setPage((p) => Math.max(1, p - 1))
              }
              disabled={pagination.page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span>
              Halaman {pagination.page} dari {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                paginationControl.setPage((p) =>
                  Math.min(pagination.totalPages, p + 1)
                )
              }
              disabled={pagination.page === pagination.totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>

      <SendNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={selectedUsersForModal}
        onSendNotification={handleSendNotification}
        defaultType="dosen"
        preSelectedUserIds={Array.from(selectedUserIds)}
      />
    </section>
  );
}
