import ExpandableIconMenu from "@/app/(pengamat)/pengamat/ui/ExpandableIconMenu";
import ErrorHandler from "@/components/common/ErrorHandler";
import useGuest from "@/hooks/useGuest";
import useLoginFormSubmit from "@/hooks/useLoginFormSubmit";
import { User } from "@/types/user.types";
import Image from "next/image";
import React from "react";

export default function SettingContent({ user }: { user: User }) {
  const { handleUpdateUser } = useGuest(false);
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    role,
    setRole,
    plan,
    setPlan,
    handleSubmit,
    isLoading,
    error,
  } = useLoginFormSubmit(user, "old", handleUpdateUser);

  if (error) {
    return (
      <ErrorHandler message={error} onRetry={() => window.location.reload()} />
    );
  }
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white">
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
          <div className="flex flex-col items-center space-y-2 sm:w-1/3">
            {user.picture ? (
              <Image
                width={100}
                height={100}
                src={user.picture}
                alt={`${user.displayName}'s profile`}
                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
                priority
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-4xl">
                  {user.firstName?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <p className="text-sm text-gray-600">Gambar Profil</p>
          </div>

          <div className="w-full sm:w-2/3 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name:
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Role:
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Select Role --</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="fullstack">Fullstack Developer</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Select Plan:
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Select Plan --</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!firstName || !lastName || !role || !plan}
              className={`w-full py-3 rounded ${
                !firstName || !lastName || !role || !plan
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              }`}
            >
              {isLoading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Account Status:
            </label>
            <div
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                user.status === "nonactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Joined Since:
            </label>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
      {user?.level === "pengamat" && <ExpandableIconMenu />}
    </div>
  );
}
