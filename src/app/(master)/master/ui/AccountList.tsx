import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { User } from "@/types/user.types";
import EditAccountModal from "./EditAccountModal";
import AccountItem from "./AccountItem";

export default function AccountList({
  accounts,
  loading,
  error,
  refetch,
  editAccount,
  deleteAccount,
}: {
  accounts: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  editAccount: (id: string, level: string) => void;
  deleteAccount: (id: string) => void;
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const openEditModal = (user: any) => {
    setSelectedUser({ ...user });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const saveData = (newLevel: string) => {
    if (!selectedUser) return;
    editAccount(selectedUser._id, newLevel);
    setIsModalOpen(false);
  };

  const handleDelete = (user: any) => {
    if (
      window.confirm(`Are you sure you want to delete ${user.displayName}?`)
    ) {
      deleteAccount(user._id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionRef.current &&
        !actionRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        <p>{error}</p>
        <button
          onClick={refetch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Coba Lagi
        </button>
      </div>
    );

  if (!accounts || accounts.length === 0)
    return (
      <div className="flex items-center justify-center h-full text-gray-600">
        <p>Tidak ada akun yang ditemukan.</p>
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
        {accounts.map((user) => (
          <AccountItem
            key={user._id}
            user={user}
            activeDropdown={activeDropdown}
            toggleDropdown={() =>
              setActiveDropdown(activeDropdown === user._id ? null : user._id)
            }
            openEditModal={() => openEditModal(user)}
            handleDelete={() => handleDelete(user)}
            actionRef={actionRef}
          />
        ))}
      </div>
      <EditAccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={saveData}
        initialData={{
          level: selectedUser?.level || "user",
        }}
      />
    </>
  );
}
