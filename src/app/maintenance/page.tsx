"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function MaintenancePage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-center items-center px-4 text-center">
      <div className="mb-6 transition-transform transform hover:scale-105 duration-300">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto drop-shadow-md sm:w-20 sm:h-20"
        />
      </div>

      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-200 backdrop-blur-sm bg-opacity-90 transform transition-all hover:shadow-3xl duration-300">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          Kami Sedang Melakukan Pemeliharaan
        </h1>
        <p className="text-gray-600 mb-8 sm:mb-10 max-w-md mx-auto text-sm sm:text-base">
          Maaf atas ketidaknyamanannya. Kami sedang melakukan perawatan berkala
          untuk memberikan pengalaman terbaik bagi Anda.
        </p>

        <div className="flex justify-center mb-8 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>

        <div className="text-xs sm:text-sm text-gray-500 space-y-2 mt-4">
          <p>Harap tunggu beberapa saat.</p>
          <p>Kami akan kembali secepatnya!</p>
        </div>
      </div>

      <footer className="mt-5 text-xs sm:text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Dracobase. Semua Hak Dilindungi.
      </footer>
    </div>
  );
}
