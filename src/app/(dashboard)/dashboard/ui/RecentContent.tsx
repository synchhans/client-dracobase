import useRecent from "@/hooks/useRecent";
import { Recent } from "@/types/recent.types";
import Image from "next/image";
import { useState } from "react";
import { FaFilter, FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import ActionMenu from "@/components/ui/recent/ActionMenu";

export default function RecentContent({
  id1,
  id2,
}: {
  id1: string;
  id2: string;
}) {
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const [filterLanguage, setFilterLanguage] = useState<string>("");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { recents, deleteRecent } = useRecent();
  const sortedRecents = [...recents].sort((a, b) => {
    if (sortBy === "latest") {
      return (
        new Date(b.accessedAt).getTime() - new Date(a.accessedAt).getTime()
      );
    } else {
      return (
        new Date(a.accessedAt).getTime() - new Date(b.accessedAt).getTime()
      );
    }
  });

  const filteredRecents = sortedRecents.filter((recent: Recent) => {
    const matchesLanguage =
      !filterLanguage || recent.workspace.language.name === filterLanguage;
    return matchesLanguage;
  });

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4" id={id1}>
        RECENT USER CONTENT
      </h2>

      {recents.length !== 0 ? (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative">
            <button
              className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white flex items-center gap-2"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            >
              <FaFilter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="border-b border-gray-200 p-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Urutkan
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          setSortBy("latest");
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2 ${
                          sortBy === "latest" ? "bg-gray-100" : ""
                        }`}
                      >
                        <FaSortAmountDownAlt className="w-4 h-4" />
                        Terbaru
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setSortBy("oldest");
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2 ${
                          sortBy === "oldest" ? "bg-gray-100" : ""
                        }`}
                      >
                        <FaSortAmountUp className="w-4 h-4" />
                        Terlama
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Bahasa Pemrograman
                  </p>
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => setFilterLanguage("")}
                        className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                          filterLanguage === "" ? "bg-gray-100" : ""
                        }`}
                      >
                        Semua Bahasa
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setFilterLanguage("HTML+CSS")}
                        className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                          filterLanguage === "HTML+CSS" ? "bg-gray-100" : ""
                        }`}
                      >
                        HTML+CSS
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setFilterLanguage("JavaScript")}
                        className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                          filterLanguage === "JavaScript" ? "bg-gray-100" : ""
                        }`}
                      >
                        JavaScript
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setFilterLanguage("Python")}
                        className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                          filterLanguage === "Python" ? "bg-gray-100" : ""
                        }`}
                      >
                        Python
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setFilterLanguage("PHP")}
                        className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                          filterLanguage === "PHP" ? "bg-gray-100" : ""
                        }`}
                      >
                        PHP
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        id={id2}
      >
        {filteredRecents.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-8 space-y-4">
            <p className="text-center">
              Recent Kosong, Pilih Bahasa Pemrograman yang ingin kamu pelajari.
            </p>
          </div>
        ) : (
          filteredRecents.map((recent: Recent) => (
            <div
              key={recent.id}
              className="relative bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                (window.location.href = `/workspace/${recent.workspace.id}`)
              }
            >
              <div className="absolute top-2 right-2">
                <ActionMenu
                  isActive={activeDropdown === recent.id}
                  onToggle={(e) => {
                    e.stopPropagation();
                    toggleDropdown(recent.id);
                  }}
                  onDelete={(e) => {
                    e.stopPropagation();
                    deleteRecent(recent.id);
                  }}
                />
              </div>

              <h3 className="text-base font-medium text-gray-800">
                {recent.workspace.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {recent.workspace.description || "Tidak ada deskripsi"}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src={recent.workspace.language.icon}
                  alt={`Icon ${recent.workspace.language.name}`}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {recent.workspace.language.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {recent.workspace.language.description}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Diakses pada: {new Date(recent.accessedAt).toLocaleString()}
              </p>

              <div className="mt-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    recent.isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {recent.isCompleted ? "Selesai" : "Belum Selesai"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
