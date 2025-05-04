import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-2xl font-semibold">Oops! Page Not Found</p>
      <p className="mt-2 text-lg text-gray-600">
        The page you are looking for might have been removed or doesn&apos;t
        exist.
      </p>

      <Link
        href="/dashboard"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
