import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newLevel: string) => void;
  initialData: { level: string };
}

export default function EditAccountModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditAccountModalProps) {
  const [newLevel, setNewLevel] = useState(initialData.level);

  useEffect(() => {
    setNewLevel(initialData.level);
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-brightness-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Level {initialData.level}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Level
          </label>
          <select
            id="level"
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="user">User</option>
            <option value="dosen">Dosen</option>
            <option value="pengamat">Pengamat</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Batal
          </button>
          <button
            onClick={() => onSave(newLevel)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
