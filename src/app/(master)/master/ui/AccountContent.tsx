import useAccount from "@/hooks/useAccount";
import { User } from "@/types/user.types";
import AccountFilterBar from "./AccountFilterBar";
import AccountList from "./AccountList";
import { useAccountFilters } from "./useAccountFilters";
import { useState } from "react";
import SendNotificationModal from "./SendNotificationModal";
import { useSendNotification } from "@/hooks/useSendNotification";
import { toast } from "react-toastify";
import { NotificationType } from "@/types/notification.type";

export default function AccountContent({ user }: { user: User }) {
  const {
    accounts,
    loading: accountLoading,
    error: accountError,
    refetch,
    editAccount,
    deleteAccount,
  } = useAccount();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const [filterLoginVia, setFilterLoginVia] = useState("");
  const [filterProfileComplete, setFilterProfileComplete] = useState<
    "completed" | "incomplete" | ""
  >("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAccounts = useAccountFilters({
    accounts: accounts || [],
    searchTerm,
    sortBy,
    filterLoginVia,
    filterProfileComplete,
  });

  const {
    loading: notificationLoading,
    error: notificationError,
    sendNotification,
  } = useSendNotification();

  const handleSendNotification = async (
    userIds: string[],
    title: string,
    message: string,
    type: NotificationType
  ) => {
    console.log(userIds);
    const result = await sendNotification(userIds, title, message, type);

    if (result.success) {
      toast.success(result.message);
      setIsModalOpen(false);
    } else {
      toast.error("Gagal mengirim notifikasi.");
      console.error(result.error);
    }
  };

  return (
    <div className="p-3">
      <div className="flex flex-col sm:flex-row justify-between h-full items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <AccountFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterLoginVia={filterLoginVia}
            setFilterLoginVia={setFilterLoginVia}
            filterProfileComplete={filterProfileComplete}
            setFilterProfileComplete={setFilterProfileComplete}
          />

          <button
            className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer bg-blue-950 text-white hover:bg-blue-900"
            onClick={() => setIsModalOpen(true)}
          >
            Kirim Notifikasi
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Cari user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setSearchTerm("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <AccountList
        accounts={filteredAccounts}
        loading={accountLoading}
        error={accountError}
        refetch={refetch}
        editAccount={editAccount}
        deleteAccount={deleteAccount}
      />

      <SendNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={filteredAccounts}
        onSendNotification={handleSendNotification}
      />
    </div>
  );
}
