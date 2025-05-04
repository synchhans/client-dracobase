"use client";

import { ErrorHandlerProps } from "@/types/errorHandler.types";
import React from "react";

export default function ErrorHandler({ message, onRetry }: ErrorHandlerProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50">
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-gray-800">
            Oops! Something went wrong.
          </h2>
        </div>
        <p className="text-gray-600">{message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}