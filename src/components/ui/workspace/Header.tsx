import React from "react";
import { FaCode, FaToggleOn, FaToggleOff, FaPlay } from "react-icons/fa";

interface HeaderProps {
  language: string;
  isRealTime: boolean;
  toggleRealTime: () => void;
  runCode: () => void;
  isLoading: boolean;
  isCompleted: boolean;
}

const Header: React.FC<HeaderProps> = ({
  language,
  isRealTime,
  toggleRealTime,
  runCode,
  isLoading,
  isCompleted,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <FaCode className="text-blue-500" />
        <span
          className="truncate sm:whitespace-nowrap sm:overflow-hidden sm:text-ellipsis md:max-w-[200px] lg:max-w-[200px] max-w-[50px]"
          title={language}
        >
          Editor - {language}
        </span>
      </h2>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleRealTime}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          title={
            isRealTime ? "Matikan Mode Real-Time" : "Aktifkan Mode Real-Time"
          }
        >
          {isRealTime ? (
            <FaToggleOn className="text-green-500 text-lg" />
          ) : (
            <FaToggleOff className="text-gray-500 text-lg" />
          )}
          <span className="hidden sm:block text-sm">
            {isRealTime ? "Real-Time Aktif" : "Real-Time Mati"}
          </span>
        </button>

        <button
          onClick={runCode}
          className={`${
            isLoading || isCompleted
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 cursor-pointer hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md flex items-center gap-2 transition 
             sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base`}
          disabled={isLoading || isCompleted}
          title={
            isLoading
              ? "Sedang memproses code..."
              : isCompleted
              ? "Pembelajaran diselesaikan!"
              : "Tekan untuk menjalankan code"
          }
        >
          {isLoading ? (
            <span className="animate-spin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
            </span>
          ) : (
            <>
              <FaPlay className="text-xs sm:text-sm" /> Jalankan
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
