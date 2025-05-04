import React, { useState } from "react";
import Image from "next/image";
import { FaBars, FaLock, FaUnlock } from "react-icons/fa";
import { Workspace } from "@/types/workspace.types";
import { useLearningProgress } from "@/hooks/useLearningProgress";
import TerminalEditor from "./TerminalEditor";

export default function LearningPlatform({
  workspace,
}: {
  workspace: Workspace;
}) {
  if (!workspace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Workspace tidak ditemukan.</p>
      </div>
    );
  }

  const {
    currentMaterialIndex,
    completedMaterials,
    isCompleted,
    loading,
    updateMaterialIndex,
    markMaterialAsCompleted,
    markAsCompleted,
  } = useLearningProgress(workspace.userId._id, workspace._id);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const goToNextMaterial = () => {
    if (isCompleted) return;
    const currentMaterialIndexNumber = currentMaterialIndex;
    if (!completedMaterials.includes(currentMaterialIndexNumber)) {
      markMaterialAsCompleted(currentMaterialIndexNumber);
    }
    if (currentMaterialIndex < workspace.language.materials.length - 1) {
      updateMaterialIndex(currentMaterialIndex + 1);
    }
  };

  const goToPreviousMaterial = () => {
    if (isCompleted) return;
    if (currentMaterialIndex > 0) {
      updateMaterialIndex(currentMaterialIndex - 1);
    }
  };

  const isMaterialCompleted = (materialIndex: number): boolean => {
    return completedMaterials.includes(materialIndex);
  };

  const handleMaterialClick = (index: number) => {
    if (isCompleted) {
      updateMaterialIndex(index);
      return;
    }
    if (index <= currentMaterialIndex || completedMaterials.includes(index)) {
      updateMaterialIndex(index);
    }
  };

  const currentMaterial = workspace.language.materials[currentMaterialIndex];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const getYoutubeEmbedUrl = (
    url: string
  ): { type: "video" | "playlist"; embedUrl: string } | null => {
    const videoRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const videoMatch = url.match(videoRegex);

    if (videoMatch) {
      return {
        type: "video",
        embedUrl: `https://www.youtube.com/embed/${videoMatch[1]}`,
      };
    }

    const playlistRegex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/;
    const playlistMatch = url.match(playlistRegex);

    if (playlistMatch) {
      return {
        type: "playlist",
        embedUrl: `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}`,
      };
    }

    return null;
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Gagal menyalin teks:", error);
    }
  };

  const renderContentBlock = (block: any) => {
    switch (block.type) {
      case "text":
        return <p className="text-gray-700 mb-4">{block.content.toString()}</p>;
      case "code":
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-between">
              <span>Contoh Kode</span>
              <button
                onClick={() => handleCopy(block.content.toString())}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </h2>
            <pre className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
              <code>{block.content.toString()}</code>
            </pre>
          </div>
        );
      case "commands":
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Perintah Terminal
            </h2>
            <div className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
              {block.content.map((command: string, index: number) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="text-green-400 mr-2">&gt;</span>
                  <code className="font-mono">{command}</code>
                </div>
              ))}
            </div>
          </div>
        );
      case "terminal":
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Terminal
            </h2>
            <TerminalEditor
              defaultValue={block.content.toString()}
              language={workspace.language.name}
              materialId={currentMaterial._id!}
              contentBlock={block}
              workspaceId={workspace._id}
              isCompleted={isCompleted}
            />
          </div>
        );
      case "image":
        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Gambar</h2>
            <Image
              src={block.content.toString()}
              alt="Materi"
              width={300}
              height={100}
              className="rounded-md"
            />
          </div>
        );
      case "video":
        const result = getYoutubeEmbedUrl(block.content.toString());
        if (!result) {
          return (
            <p className="text-red-500">URL video atau playlist tidak valid.</p>
          );
        }

        const { type, embedUrl } = result;

        return (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {type === "playlist" ? "Playlist" : "Video"}
            </h2>
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
              <iframe
                src={embedUrl}
                title={
                  type === "playlist" ? "YouTube Playlist" : "YouTube Video"
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-64 bg-white border-r border-gray-200 p-6 space-y-4 fixed inset-y-0 left-0 z-50 lg:relative`}
      >
        <div className="flex items-center gap-3 mb-4">
          <a
            href="/dashboard"
            className="px-0.5 hover:bg-gray-100 rounded-sm cursor-pointer"
          >
            <Image
              src={"/logo.svg"}
              alt="Logo"
              width={30}
              height={30}
              priority
            />
          </a>
          <h2 className="text-lg font-semibold text-gray-800">Materi</h2>
          {isCompleted && (
            <span className="text-sm text-green-500 font-bold ml-auto">
              Selesai
            </span>
          )}
          <button
            className="lg:hidden ml-auto"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-2">
          {workspace.language.materials.map((material, index) => {
            const isActive = index === currentMaterialIndex;
            const isLocked =
              !isCompleted &&
              index > currentMaterialIndex &&
              !isMaterialCompleted(index);
            return (
              <li
                key={material._id}
                onClick={() => {
                  handleMaterialClick(index);
                  setIsSidebarOpen(false);
                }}
                className={`p-3 rounded-md flex items-center ${
                  isActive
                    ? "bg-blue-100 text-blue-700 cursor-default"
                    : isLocked
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {isLocked ? (
                  <>
                    <FaLock className="mr-2 text-red-500" />
                    {material.title}
                  </>
                ) : (
                  <>
                    <FaUnlock className="mr-2 text-green-500" />
                    {material.title}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      <button
        className="lg:hidden p-4 bg-transparent shadow-md fixed top-0 left-0 z-50"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="text-sm" />
      </button>

      <main className="flex-1 p-8 pb-20 overflow-y-auto lg:ml-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {currentMaterial.title}
        </h1>

        {currentMaterial.contentBlocks.map((block, index) => (
          <div key={index} className="mb-6">
            {renderContentBlock(block)}
          </div>
        ))}
      </main>

      {!isCompleted && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goToPreviousMaterial}
            disabled={currentMaterialIndex === 0}
          >
            Previous
          </button>
          {currentMaterialIndex === workspace.language.materials.length - 1 ? (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={markAsCompleted}
            >
              Selesai
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={goToNextMaterial}
              disabled={
                currentMaterialIndex === workspace.language.materials.length - 1
              }
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
