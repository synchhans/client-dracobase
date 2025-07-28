import {
  DosenRecentItem,
  MahasiswaWorkspace,
  PaginationInfo,
} from "@/types/dosen.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiGetDosenRecents = async (): Promise<DosenRecentItem[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ditemukan.");

  const response = await fetch(`${API_BASE_URL}/api/recent`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal mengambil recent workspace.");
  }

  const result = await response.json();
  return result.data || [];
};

interface MahasiswaWorkspaceResponse {
  data: MahasiswaWorkspace[];
  pagination: PaginationInfo;
}

export const apiGetMahasiswaWorkspaces = async (filters: {
  search: string;
  minProgress: number | "";
  maxProgress: number | "";
  page: number;
  limit: number;
}): Promise<MahasiswaWorkspaceResponse> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ditemukan.");

  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.minProgress !== "")
    params.append("minProgress", String(filters.minProgress));
  if (filters.maxProgress !== "")
    params.append("maxProgress", String(filters.maxProgress));
  params.append("page", String(filters.page));
  params.append("limit", String(filters.limit));

  const response = await fetch(
    `${API_BASE_URL}/api/dosen/recent?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal memantau workspace mahasiswa.");
  }

  return response.json();
};