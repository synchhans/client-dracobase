"use client";

import { FaFilter, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { usePantauMahasiswa } from "@/hooks/usePantauMahasiswa";

type WorkspaceFilterBarProps = {
  filters: ReturnType<typeof usePantauMahasiswa>["filters"];
};

export default function WorkspaceFilterBar({
  filters,
}: WorkspaceFilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:flex-grow">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Cari nama workspace..."
          value={filters.searchTerm}
          onChange={(e) => filters.setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {filters.searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
            onClick={() => filters.setSearchTerm("")}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full sm:w-auto px-4 py-2 flex items-center justify-center gap-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
        >
          <FaFilter />
          <span>Filter Progress</span>
        </button>

        {isFilterOpen && (
          <div
            className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-20 p-4"
          >
            <h4 className="font-semibold mb-2 text-sm text-gray-700">
              Rentang Progress (%)
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minProgress}
                onChange={(e) =>
                  filters.setMinProgress(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full px-2 py-1 border rounded-md text-sm"
                min="0"
                max="100"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxProgress}
                onChange={(e) =>
                  filters.setMaxProgress(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                className="w-full px-2 py-1 border rounded-md text-sm"
                min="0"
                max="100"
              />
            </div>
            <button
              onClick={() => {
                filters.setMinProgress("");
                filters.setMaxProgress(100);
                setIsFilterOpen(false);
              }}
              className="text-xs text-blue-600 hover:underline mt-3 w-full text-left"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
