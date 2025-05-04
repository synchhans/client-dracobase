"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import LearningPlatform from "@/components/ui/workspace/LearningPlatform";
import useFetchWorkspace from "@/hooks/useFetchWorkspace";
import Link from "next/link";
import React, { useEffect } from "react";

export default function WorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { workspace, loading, error, shouldRedirect } = useFetchWorkspace(id);

  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = "/login";
    }
  }, [shouldRedirect]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-2 text-gray-700">{error}</p>
        <Link href="/dashboard">
          <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
            Back to Workspaces
          </button>
        </Link>
      </div>
    );
  }

  if (workspace) {
    return <LearningPlatform workspace={workspace} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">Workspace Not Found</h1>
      <p className="mt-2 text-gray-700">
        The provided ID does not match any workspace.
      </p>
      <Link href="/dashboard">
        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Back to Workspaces
        </button>
      </Link>
    </div>
  );
}
