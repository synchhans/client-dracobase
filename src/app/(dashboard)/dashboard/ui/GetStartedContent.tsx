import ExpandableIconMenu from "@/app/(pengamat)/pengamat/ui/ExpandableIconMenu";
import { User } from "@/types/user.types";
import React, { useState } from "react";

export default function DocumentationPage({ user }: { user: User }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubSection, setActiveSubSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const toggleSubSection = (subSectionId: string) => {
    setActiveSubSection(
      activeSubSection === subSectionId ? null : subSectionId
    );
  };

  return (
    <div className="h-[calc(100vh-73px)] overflow-y-hidden p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Dokumentasi Platform Pemrograman
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Panduan lengkap sementara untuk menggunakan platform ini.
        </p>
      </header>

      <div className="space-y-6">
        <div>
          <button
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() => toggleSection("about")}
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-lg font-medium text-gray-800">
                Tentang Platform
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
                activeSection === "about" ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {activeSection === "about" && (
            <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Platform ini dirancang untuk membantu mahasiswa belajar
                pemrograman dengan bantuan teknologi kecerdasan buatan (AI).
                Fitur utama meliputi:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>Berbasis AI:</strong> Memberikan feedback otomatis dan
                  debugging.
                </li>
                <li>
                  <strong>Feedback Otomatis:</strong> Membantu pengguna memahami
                  kesalahan dalam kode mereka.
                </li>
                <li>
                  <strong>Debugging:</strong> Menganalisis dan menemukan
                  kesalahan dalam kode secara otomatis.
                </li>
                <li>
                  <strong>Code Editor Online:</strong> Praktik langsung di
                  browser untuk berbagai bahasa pemrograman.
                </li>
              </ul>
            </div>
          )}
        </div>

        <div>
          <button
            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() => toggleSection("features")}
          >
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                />
              </svg>
              <span className="text-lg font-medium text-gray-800">
                Fitur Utama
              </span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
                activeSection === "features" ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {activeSection === "features" && (
            <div className="mt-4 space-y-4">
              <div>
                <button
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => toggleSubSection("codeEditor")}
                >
                  <span className="text-base font-medium text-gray-700">
                    Code Editor Online
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      activeSubSection === "codeEditor" ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeSubSection === "codeEditor" && (
                  <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      Praktik langsung di browser untuk berbagai bahasa
                      pemrograman seperti:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
                      <li>HTML</li>
                      <li>CSS</li>
                      <li>JavaScript</li>
                      <li>PHP</li>
                      <li>Python</li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <button
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => toggleSubSection("feedback")}
                >
                  <span className="text-base font-medium text-gray-700">
                    Feedback Otomatis
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      activeSubSection === "feedback" ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeSubSection === "feedback" && (
                  <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      Analisis langsung kesalahan dalam kode pengguna dan
                      memberikan saran perbaikan.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <button
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-all"
                  onClick={() => toggleSubSection("debugging")}
                >
                  <span className="text-base font-medium text-gray-700">
                    Debugging
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      activeSubSection === "debugging" ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {activeSubSection === "debugging" && (
                  <div className="mt-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      Identifikasi masalah dalam kode secara otomatis dan
                      berikan solusi yang relevan.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {user?.level === "pengamat" && <ExpandableIconMenu />}
    </div>
  );
}
