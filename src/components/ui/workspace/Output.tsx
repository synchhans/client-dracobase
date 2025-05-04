import React from "react";
import { FaPlay } from "react-icons/fa";

interface OutputProps {
  language: string;
  output: string;
}

const SUPPORTED_LANGUAGES = ["html", "javascript"];

const Output: React.FC<OutputProps> = ({ language, output }) => {
  return (
    <div className="bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-5 shadow-sm rounded-lg">
      <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2 mb-3">
        <FaPlay className="text-green-500" /> Output Hasil
      </h3>

      <div className="bg-gray-50 border border-gray-200 rounded-md overflow-hidden h-72 relative transition-all hover:shadow-inner">
        {SUPPORTED_LANGUAGES.includes(language) ? (
          language === "html" ? (
            <iframe
              srcDoc={output || "<p class='p-4'>No output available.</p>"}
              title="Rendered HTML"
              aria-label="Rendered HTML Output"
              className="w-full h-full border-none bg-white"
            />
          ) : (
            <pre className="p-4 text-gray-800 whitespace-pre-wrap overflow-auto h-full font-mono text-sm">
              {output || "No output available."}
            </pre>
          )
        ) : (
          <div className="flex items-center justify-center h-full p-4 text-gray-500 italic text-center">
            Output tidak tersedia untuk bahasa ini.
          </div>
        )}
      </div>
    </div>
  );
};

export default Output;
