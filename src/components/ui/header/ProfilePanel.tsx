import { FaCog, FaSignOutAlt } from "react-icons/fa";

export default function ProfilePanel({
  handleLogout,
}: {
  handleLogout: () => void;
}) {
  return (
    <div className="absolute right-0 mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      <div
        className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          window.location.href = "/setting";
        }}
      >
        <FaCog className="mr-2 text-lg" />
        Setting
      </div>

      <div
        className="flex items-center px-4 py-2 text-red-600 text-sm hover:bg-gray-100 cursor-pointer"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2 text-lg" />
        Logout
      </div>
    </div>
  );
}
