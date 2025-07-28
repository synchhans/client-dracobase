"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { MahasiswaWorkspace } from "@/types/dosen.types";
import Image from "next/image";
import React from "react";

type WorkspaceListProps = {
  workspaces: MahasiswaWorkspace[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  selectedUserIds: Set<string>;
  setSelectedUserIds: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export default function WorkspaceList({
  workspaces,
  loading,
  error,
  refetch,
  selectedUserIds,
  setSelectedUserIds,
}: WorkspaceListProps) {
  const handleSelect = (userId: string) => {
    const newSelected = new Set(selectedUserIds);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUserIds(newSelected);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allUserIds = new Set(workspaces.map((ws) => ws.mahasiswa._id));
      setSelectedUserIds(allUserIds);
    } else {
      setSelectedUserIds(new Set());
    }
  };

  const uniqueUserIdsInList = new Set(workspaces.map((ws) => ws.mahasiswa._id));
  const isAllSelected =
    uniqueUserIdsInList.size > 0 &&
    Array.from(uniqueUserIdsInList).every((id) => selectedUserIds.has(id));

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="text-center p-10 text-red-500 h-64 flex flex-col justify-center items-center">
        <p className="font-semibold">Terjadi Kesalahan</p>
        <p className="text-sm mb-4">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-500 text-white rounded text-sm"
        >
          Coba Lagi
        </button>
      </div>
    );

  if (!workspaces || workspaces.length === 0)
    return (
      <div className="text-center p-10 text-gray-500 h-64 flex justify-center items-center">
        <p>Tidak ada workspace yang cocok dengan kriteria pencarian.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 w-12 text-center">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={isAllSelected}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mahasiswa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Workspace
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workspaces.map((ws) => (
            <tr key={ws.workspaceId} className="hover:bg-gray-50">
              <td className="px-4 py-4 text-center">
                <input
                  type="checkbox"
                  checked={selectedUserIds.has(ws.mahasiswa._id)}
                  onChange={() => handleSelect(ws.mahasiswa._id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Image
                    src={ws.mahasiswa.picture}
                    width={50}
                    height={50}
                    alt={ws.mahasiswa.displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {ws.mahasiswa.displayName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {ws.mahasiswa.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {ws.workspaceName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3 w-48">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${Math.round(ws.progressPercentage)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 min-w-[45px] text-right">
                    {ws.progressPercentage.toFixed(1)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
