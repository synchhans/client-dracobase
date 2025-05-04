"use client";
import React from "react";

const Features = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center py-16 features-bg"
      id="features"
    >
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-12">
          Mengapa Memilih Dracobase?
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:bg-blue-50 transition duration-300">
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
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">
              Berdasarkan AI
            </h3>
            <p className="mt-2 text-gray-600">
              Platform kami menggunakan kecerdasan buatan untuk membantu Anda
              belajar pemrograman dengan lebih efisien.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:bg-green-50 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto text-green-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">
              Feedback Otomatis
            </h3>
            <p className="mt-2 text-gray-600">
              Dapatkan saran langsung tentang kesalahan dalam kode Anda dan cara
              memperbaikinya.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:bg-indigo-50 transition duration-300">
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
            <h3 className="text-xl font-semibold text-gray-800">
              Debugging Cerdas
            </h3>
            <p className="mt-2 text-gray-600">
              Temukan dan perbaiki bug dalam kode Anda secara otomatis dengan
              alat debugging canggih.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
