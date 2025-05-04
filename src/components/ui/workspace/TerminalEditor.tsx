import React, { useEffect, useState } from "react";
import Header from "./Header";
import Editor from "./Editor";
import Output from "./Output";
import DebuggerPanel from "./DebuggerPanel";
import FeedbackPanel from "./FeedbackPanel";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useDebugging } from "@/hooks/useDebugging";
import { useFeedback } from "@/hooks/useFeedback";
import { ContentBlock } from "@/types/language.types";

interface TerminalEditorProps {
  language: string;
  defaultValue: string;
  materialId: string;
  contentBlock: ContentBlock;
  workspaceId: string;
  isCompleted: boolean;
}

const LANGUAGE_MAP: { [key: string]: string } = {
  "HTML+CSS": "html",
  JavaScript: "javascript",
  PHP: "php",
  Python: "python",
};

const TerminalEditor: React.FC<TerminalEditorProps> = ({
  language,
  defaultValue,
  materialId,
  contentBlock,
  workspaceId,
  isCompleted,
}) => {
  const [code, setCode] = useState(defaultValue);
  const [hasRunCode, setHasRunCode] = useState(false);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRealTime, setIsRealTime] = useState(false);

  const {
    debugData,
    isDebuggerVisible,
    isDebugLoading,
    handleDebug,
    setIsDebuggerVisible,
  } = useDebugging(workspaceId, materialId, contentBlock._id!);

  const {
    aiFeedback,
    isFeedbackVisible,
    isAILoading,
    handleFeedback,
    setIsFeedbackVisible,
  } = useFeedback(workspaceId, materialId, contentBlock._id!);

  const runCode = async () => {
    setIsLoading(true);
    try {
      const mappedLanguage = LANGUAGE_MAP[language] || language;

      if (mappedLanguage === "html") {
        setOutput(code);
      } else if (mappedLanguage === "javascript") {
        const result = eval(code);
        setOutput(String(result));
      } else {
        setOutput("Output hanya tersedia untuk mode HTML dan JavaScript.");
      }

      setHasRunCode(true);
    } catch (error) {
      console.error("Error rendering output:", error);
      setOutput("Terjadi kesalahan saat merender output.");
    } finally {
      setIsLoading(false);
    }
  };

  const runCodeForRealTime = async () => {
    try {
      const mappedLanguage = LANGUAGE_MAP[language] || language;

      if (mappedLanguage === "html") {
        setOutput(code);
      } else if (mappedLanguage === "javascript") {
        const result = eval(code);
        setOutput(String(result));
      } else {
        setOutput("Output hanya tersedia untuk mode HTML dan JavaScript.");
      }
    } catch (error) {
      console.error("Error rendering output:", error);
      setOutput("Terjadi kesalahan saat merender output.");
    }
  };

  const toggleRealTime = () => {
    if (!isRealTime) {
      setIsDebuggerVisible(false);
      setIsFeedbackVisible(false);
      setHasRunCode(false);
    }
    setIsRealTime(!isRealTime);
  };

  useEffect(() => {
    if (isRealTime) {
      runCodeForRealTime();
    }
  }, [code, isRealTime]);

  return (
    <div className="flex flex-col bg-gray-100 rounded-md shadow-md overflow-hidden">
      <Header
        language={language}
        isRealTime={isRealTime}
        toggleRealTime={toggleRealTime}
        runCode={runCode}
        isLoading={isLoading}
        isCompleted={isCompleted}
      />

      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-4">
          <Editor
            language={LANGUAGE_MAP[language] || language}
            code={code}
            onChange={setCode}
          />
          <div className="mt-4 flex gap-2">
            {debugData && (
              <button
                onClick={() => setIsDebuggerVisible(!isDebuggerVisible)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                  isRealTime
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
                title={isDebuggerVisible ? "Hide Debugger" : "Show Debugger"}
                disabled={isRealTime}
              >
                {isDebuggerVisible ? (
                  <FaToggleOn className="text-lg" />
                ) : (
                  <FaToggleOff className="text-lg" />
                )}
                <span className="hidden sm:block text-sm">Debugger AI</span>
              </button>
            )}

            {!debugData && (
              <button
                onClick={() => handleDebug({ code })}
                className={`px-4 py-2 rounded-md text-white transition-all ${
                  isRealTime || !hasRunCode || isDebugLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
                disabled={isRealTime || !hasRunCode || isDebugLoading}
                title={
                  isRealTime
                    ? "Fitur ini tidak tersedia dalam mode real-time."
                    : !hasRunCode
                    ? "Tekan tombol 'Jalankan' terlebih dahulu."
                    : isDebugLoading
                    ? "Sedang memproses debugging..."
                    : "Tekan untuk menjalankan debugging kode"
                }
              >
                {isDebugLoading ? "Loading..." : "Debug AI"}
              </button>
            )}

            {!aiFeedback && (
              <button
                onClick={() => handleFeedback({ code })}
                className={`px-4 py-2 rounded-md text-white transition-all ${
                  isRealTime || !hasRunCode || isAILoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600"
                }`}
                disabled={isRealTime || !hasRunCode || isAILoading}
                title={
                  isRealTime
                    ? "Fitur ini tidak tersedia dalam mode real-time."
                    : !hasRunCode
                    ? "Tekan tombol 'Jalankan' terlebih dahulu."
                    : isAILoading
                    ? "Sedang memproses AI feedback..."
                    : "Tekan untuk mendapatkan umpan balik AI"
                }
              >
                {isAILoading ? "Loading..." : "Feedback AI"}
              </button>
            )}

            {aiFeedback && (
              <button
                onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                  isRealTime
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
                title={
                  isFeedbackVisible ? "Hide AI Feedback" : "Show AI Feedback"
                }
                disabled={isRealTime}
              >
                {isFeedbackVisible ? (
                  <FaToggleOn className="text-lg" />
                ) : (
                  <FaToggleOff className="text-lg" />
                )}
                <span className="hidden sm:block text-sm">Feedback AI</span>
              </button>
            )}
          </div>

          {!isRealTime && isDebuggerVisible && debugData && (
            <DebuggerPanel {...debugData} />
          )}
        </div>

        <div className="lg:w-1/2 p-4">
          <Output
            language={LANGUAGE_MAP[language] || language}
            output={output}
          />
          {!isRealTime && isFeedbackVisible && aiFeedback && (
            <FeedbackPanel {...aiFeedback} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalEditor;
