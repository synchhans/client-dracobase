"use client";

import Image from "next/image";
import useLoginFormSubmit from "@/hooks/useLoginFormSubmit";
import { LoginFormProps } from "@/types/loginForm.types";
import ErrorHandler from "../../../../components/common/ErrorHandler";

export default function LoginForm({ user, handleUpdateUser }: LoginFormProps) {
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
  } = useLoginFormSubmit(user, "new", handleUpdateUser);

  if (error) {
    return (
      <ErrorHandler message={error} onRetry={() => window.location.reload()} />
    );
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
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
        <h1 className="text-2xl font-bold">{user.displayName}</h1>
        <p className="text-gray-600">
          {user.googleEmail || user.githubUsername}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-2">Nama Depan:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Nama Belakang:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Pilih Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Pilih Role --</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Fullstack Developer</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Pilih Plan:</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Pilih Plan --</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="education">Education</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!firstName || !lastName || !role || !plan || isLoading}
        className={`mt-6 w-full py-2 rounded ${
          !firstName || !lastName || !role || !plan || isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
        }`}
      >
        {isLoading ? "Menyimpan..." : "Simpan Profile"}
      </button>
    </div>
  );
}
