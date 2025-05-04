export default function FindHelp() {
  return (
    <section className="py-24 bg-gray-50 min-h-screen" id="help">
      <div className="container px-6 mx-auto text-center">
        <h2 className="text-6xl font-bold text-gray-800 mb-6">
          Find the Help You Need
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-5xl mx-auto">
          {[
            "Your First Repository",
            "Creating a Sandbox",
            "Workspaces",
            "DevTools",
            "Docker Integration",
            "Environment Variables",
            "VS Code Integration",
            "GitHub App",
            "Team and Access",
          ].map((item, index) => (
            <button
              key={index}
              className="px-4 py-1 text-sm font-medium text-gray-600 bg-white border rounded-full hover:bg-gray-100 transition duration-300"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">FAQ</h3>
            <p className="mt-2 text-gray-600">
              Temukan jawaban cepat untuk pertanyaan umum.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md text-center hover:bg-green-50 transition duration-300">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">Docs</h3>
            <p className="mt-2 text-gray-600">
              Baca dokumentasi lengkap tentang fitur kami.
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">
              System Status
            </h3>
            <p className="mt-2 text-gray-600">
              Lihat status sistem kami secara real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
