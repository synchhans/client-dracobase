import { useState, useEffect } from "react";
import { apiGetProgress, apiUpdateProgress } from "@/app/api/learningProgress";
import { Progress, UpdateProgressParams } from "@/types/learningProgress.type";

export const useLearningProgress = (userId: string, workspaceId: string) => {
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState<number>(0);
  const [completedMaterials, setCompletedMaterials] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress: Progress = await apiGetProgress(userId, workspaceId);
        setCurrentMaterialIndex(progress.activeMaterialIndex);
        setCompletedMaterials(progress.completedMaterialIndexes);
        setIsCompleted(progress.isCompleted || false);
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [userId, workspaceId]);

  const saveCurrentProgress = async (
    newMaterialIndex: number,
    newCompletedMaterials: number[],
    isCompletedParam: boolean = false
  ) => {
    if (isCompleted) return;

    try {
      const params: UpdateProgressParams = {
        activeMaterialIndex: newMaterialIndex,
        completedMaterialIndexes: newCompletedMaterials.map(Number),
        isCompleted: isCompletedParam,
      };
      await apiUpdateProgress(userId, workspaceId, params);

      if (isCompletedParam) {
        setIsCompleted(true);
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const updateMaterialIndex = (newMaterialIndex: number) => {
    if (isCompleted) {
      setCurrentMaterialIndex(newMaterialIndex);
      return;
    }

    setCurrentMaterialIndex(newMaterialIndex);
    saveCurrentProgress(newMaterialIndex, completedMaterials);
  };

  const markMaterialAsCompleted = (materialIndex: number) => {
    if (isCompleted) return;

    if (!completedMaterials.includes(materialIndex)) {
      const newCompletedMaterials = [...completedMaterials, materialIndex];
      setCompletedMaterials(newCompletedMaterials);
      saveCurrentProgress(currentMaterialIndex, newCompletedMaterials);
    }
  };

  const markAsCompleted = async () => {
    if (isCompleted) return;

    try {
      await saveCurrentProgress(currentMaterialIndex, completedMaterials, true);

      alert("Selamat! Anda telah menyelesaikan semua materi.");
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (isCompleted) return;

      const params: UpdateProgressParams = {
        activeMaterialIndex: currentMaterialIndex,
        completedMaterialIndexes: completedMaterials,
      };
      await apiUpdateProgress(userId, workspaceId, params);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    isCompleted,
    currentMaterialIndex,
    completedMaterials,
    userId,
    workspaceId,
  ]);

  return {
    currentMaterialIndex,
    completedMaterials,
    isCompleted,
    loading,
    updateMaterialIndex,
    markMaterialAsCompleted,
    markAsCompleted,
  };
};
