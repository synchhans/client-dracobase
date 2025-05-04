"use client";
import { apiGetWorkspace } from "@/app/api/workspace";
import { Workspace } from "@/types/workspace.types";
import { useState, useEffect, useCallback } from "react";

export default function useFetchWorkspace(id: string) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const fetchWorkspace = useCallback(async () => {
    try {
      const data = await apiGetWorkspace(id);
      setWorkspace(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "Unauthorized") {
          setShouldRedirect(true);
          return;
        }
        console.error("Error fetching workspace:", err.message);
        setError(err.message || "Gagal mengambil data workspace.");
      } else {
        console.error("Unknown error occurred while fetching workspace.");
        setError("Terjadi kesalahan tak terduga.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchWorkspace();
    }
  }, [id, fetchWorkspace]);

  return { workspace, loading, error, shouldRedirect };
}
