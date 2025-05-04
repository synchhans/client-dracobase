import Link from "next/link";

export default function HeaderLogin() {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center mb-4">
        <Link href="/" aria-label="Back to homepage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-25 h-25 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">Sign in to Dracobase</h1>
      <p className="text-sm text-gray-600">
        Use your preferred account to log in.
      </p>
    </div>
  );
}
