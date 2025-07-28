import { useState, useEffect, useCallback } from "react";
import { apiGetMahasiswaWorkspaces } from "@/app/api/dosen";
import { MahasiswaWorkspace, PaginationInfo } from "@/types/dosen.types";

interface FetchWorkspacesFilters {
  search: string;
  minProgress: number | "";
  maxProgress: number | "";
  page: number;
  limit: number;
}

export function usePantauMahasiswa() {
  const [workspaces, setWorkspaces] = useState<MahasiswaWorkspace[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [minProgress, setMinProgress] = useState<number | "">("");
  const [maxProgress, setMaxProgress] = useState<number | "">(100);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchWorkspaces = useCallback(
    async (filters: FetchWorkspacesFilters) => {
      setLoading(true);
      try {
        const response = await apiGetMahasiswaWorkspaces(filters);
        setWorkspaces(response.data);
        setPagination(response.pagination);
        setError(null);
      } catch (err) {
        const msg = (err as Error).message;
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchWorkspaces({
        search: searchTerm,
        minProgress,
        maxProgress,
        page,
        limit,
      });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, minProgress, maxProgress, page, limit, fetchWorkspaces]);

  const refetch = () => {
    fetchWorkspaces({
      search: searchTerm,
      minProgress,
      maxProgress,
      page,
      limit,
    });
  };

  return {
    workspaces,
    pagination,
    loading,
    error,
    refetch,
    filters: {
      searchTerm,
      setSearchTerm,
      minProgress,
      setMinProgress,
      maxProgress,
      setMaxProgress,
    },
    paginationControl: { page, setPage, limit },
  };
}
