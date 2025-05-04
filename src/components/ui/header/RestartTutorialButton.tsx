import { useCallback } from "react";
import { FaPlayCircle } from "react-icons/fa";

interface Props {
  id1?: string;
  tutorialKey?: string;
}

export default function RestartTutorialButton({ id1, tutorialKey }: Props) {
  const restartTutorial = useCallback(() => {
    localStorage.removeItem(`tutorial_${tutorialKey}`);
    window.location.reload();
  }, [tutorialKey]);

  return (
    <button
      onClick={restartTutorial}
      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors duration-200"
      aria-label="Ulangi Panduan"
      id={id1}
    >
      <FaPlayCircle className="w-5 h-5 text-gray-600 hover:text-blue-500 transition-colors" />
    </button>
  );
}
