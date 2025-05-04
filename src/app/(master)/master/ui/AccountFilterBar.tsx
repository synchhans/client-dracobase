import { FaFilter, FaSortAmountDownAlt, FaSortAmountUp } from "react-icons/fa";
import { useState } from "react";

export default function AccountFilterBar({
  sortBy,
  setSortBy,
  filterLoginVia,
  setFilterLoginVia,
  filterProfileComplete,
  setFilterProfileComplete,
}: any) {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  return (
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
            <p className="text-xs font-semibold text-gray-600 mb-2">Urutkan</p>
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

          <div className="border-b border-gray-200 p-3">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Login Via
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setFilterLoginVia("")}
                  className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                    filterLoginVia === "" ? "bg-gray-100" : ""
                  }`}
                >
                  Semua Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilterLoginVia("Google")}
                  className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                    filterLoginVia === "Google" ? "bg-gray-100" : ""
                  }`}
                >
                  Google
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilterLoginVia("GitHub")}
                  className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                    filterLoginVia === "GitHub" ? "bg-gray-100" : ""
                  }`}
                >
                  GitHub
                </button>
              </li>
            </ul>
          </div>

          <div className="p-3">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              Profile Status
            </p>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setFilterProfileComplete("")}
                  className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                    filterProfileComplete === "" ? "bg-gray-100" : ""
                  }`}
                >
                  Semua Profil
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilterProfileComplete("completed")}
                  className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                    filterProfileComplete === "completed" ? "bg-gray-100" : ""
                  }`}
                >
                  Profil Lengkap
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilterProfileComplete("incomplete")}
                  className={`w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded ${
                    filterProfileComplete === "incomplete" ? "bg-gray-100" : ""
                  }`}
                >
                  Profil Belum Lengkap
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
