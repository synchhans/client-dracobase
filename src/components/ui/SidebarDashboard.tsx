import { SidebarDasboardProps } from "@/types/sidebarDasboardProps.types";
import {
  FaCog,
  FaTrashAlt,
  FaHistory,
  FaUser,
  FaFileAlt,
  FaTools,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarDashboard({
  id6,
  id7,
  id8,
  id9,
  id10,
  id11,
  user,
}: SidebarDasboardProps) {
  const pathname = usePathname();

  const generalMenuItems = [
    {
      name: "Recent",
      icon: <FaHistory />,
      path:
        user.level === "admin"
          ? "/master"
          : user.level === "pengamat"
          ? "/pengamat"
          : user.level === "dosen"
          ? "/dosen"
          : "/dashboard",
      id: id6,
    },
    { name: "Get Started", icon: <FaFileAlt />, path: "/get-started", id: id7 },
    { name: "Setting", icon: <FaCog />, path: "/setting", id: id8 },
  ];

  const trashMenuItems = [
    {
      name: "Recently Deleted",
      icon: <FaTrashAlt />,
      path: "/deleted",
      id: id9,
    },
  ];

  const adminMenuItems = [
    { name: "Account", icon: <FaUser />, path: "/account", id: id10 },
    {
      name: "Maintenance",
      icon: <FaTools />,
      path: "/sysmaster",
      id: id11,
    },
  ];

  return (
    <div className="w-64 h-[calc(100vh - 56px)] bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
          General
        </p>
        <nav>
          {generalMenuItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                id={item.id}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
          Trash
        </p>
        <nav>
          {trashMenuItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ${
                  pathname === item.path
                    ? "bg-red-500 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
                id={item.id}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {(user.level === "admin" || user.level === "pengamat") && (
        <div className="p-4">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-3">
            Admin Tools
          </p>
          <nav>
            {adminMenuItems.map((item, index) => {
              const isDisabled = user.level === "pengamat";

              return (
                <div
                  key={index}
                  title={isDisabled ? "Akses dibatasi oleh master" : ""}
                >
                  {isDisabled ? (
                    <div
                      className={`flex items-center p-3 rounded-md cursor-not-allowed opacity-60 text-gray-400 transition-all duration-300`}
                      id={item.id}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  ) : (
                    <Link href={item.path}>
                      <div
                        className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 ${
                          pathname === item.path
                            ? "bg-green-500 text-white shadow-md"
                            : "hover:bg-gray-100 text-gray-800"
                        }`}
                        id={item.id}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
