import { FaEllipsisV } from "react-icons/fa";

interface ActionMenuProps {
  isActive: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

function ActionMenu({ isActive, onToggle, onDelete }: ActionMenuProps) {
  return (
    <div className="relative">
      <button
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(e);
        }}
      >
        <FaEllipsisV className="w-5 h-5 m-3 cursor-pointer" />
      </button>
      {isActive && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1">
            <li>
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Fungsi edit belum diterapkan saat ini.");
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Apakah Anda yakin ingin menghapus?")) {
                    onDelete(e);
                  }
                }}
              >
                Hapus
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
