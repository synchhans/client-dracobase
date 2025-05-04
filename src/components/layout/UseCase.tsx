"use client";
import React from "react";

const UseCase = () => {
  return (
    <section className="py-16 bg-gray-50 min-h-screen" id="usecase">
      <div className="container px-6 mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 my-12">
          Bagaimana Dracobase Dapat Membantu Anda?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow-md text-center hover:bg-blue-50 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-blue-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Belajar Pemrograman Dasar
            </h3>
            <p className="text-gray-600">
              Pelajari konsep dasar pemrograman seperti HTML, CSS, Javascript,
              PHP, Python, etc. dengan bantuan AI interaktif.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md text-center hover:bg-green-50 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-yellow-500 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="7 5 17 12 7 19 7 5" />
            </svg>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Panduan Penggunaan
            </h3>

            <p className="text-gray-600">
              Kami menyediakan panduan langkah demi langkah untuk membantu Anda
              memahami semua fitur aplikasi dengan mudah, terutama saat pertama
              kali login.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md text-center hover:bg-indigo-50 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-indigo-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Debugging Cepat
            </h3>
            <p className="text-gray-600">
              Temukan dan perbaiki bug dalam kode Anda dengan cepat.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md text-center hover:bg-red-50 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-red-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-.01"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Feedback Akhir
            </h3>
            <p className="text-gray-600">
              Dapatkan saran langsung tentang kesalahan dalam kode Anda setelah
              dirender.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCase;
