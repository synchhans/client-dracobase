import { useState, useEffect } from "react";

type TutorialKey = "dashboard" | "documentation" | "workspace" | string;

export default function useUserTutorial(tutorialKey: TutorialKey = "default") {
  const [hasCompletedTutorial, setHasCompletedTutorial] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const localKey = `tutorial_${tutorialKey}`;
    const localStatus = localStorage.getItem(localKey);

    if (localStatus === "completed") {
      setHasCompletedTutorial(true);
    }

    setLoading(false);
  }, [tutorialKey]);

  const markAsCompleted = () => {
    const localKey = `tutorial_${tutorialKey}`;
    localStorage.setItem(localKey, "completed");
    setHasCompletedTutorial(true);
  };

  const forceRerunTutorial = () => {
    const localKey = `tutorial_${tutorialKey}`;
    localStorage.removeItem(localKey);
    setHasCompletedTutorial(false);
  };

  return {
    hasCompletedTutorial,
    loading,
    markAsCompleted,
    forceRerunTutorial,
  };
}
