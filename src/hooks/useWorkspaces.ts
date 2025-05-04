import { apiCreateWorkspace } from "@/app/api/workspace";
import { Workspace } from "@/types/workspace.types";
import { useState } from "react";

export default function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createWorkspace = async (
    userId: string,
    name: string,
    description: string,
    languageId: string
  ) => {
    setLoading(true);

    try {
      const newWorkspace = await apiCreateWorkspace(
        userId,
        name,
        description,
        languageId
      );
      setWorkspaces((prev) => [...prev, newWorkspace]);
    } catch (err: unknown) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    workspaces,
    loading,
    createWorkspace,
  };
}
