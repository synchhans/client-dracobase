import useMaintenance from "@/hooks/useMaintenance";
import { User } from "@/types/user.types";

export default function MaintenanceControl({ user }: { user: User }) {
  const { isMaintenance, isLoading, message, toggleMaintenance } =
    useMaintenance();

  return (
    <div
      className="flex items-center justify-center bg-gray-50 px-4"
      style={{ minHeight: "calc(100vh - 75px)" }}
    >
      <div>{user.displayName}</div>
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Pengaturan Maintenance Mode
        </h2>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-medium text-gray-700">
            Aktifkan Mode Maintenance
          </p>

          <label className="inline-flex items-center space-x-2">
            <span
              className={`text-xs ${
                isMaintenance ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {isMaintenance ? "ON" : "OFF"}
            </span>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isMaintenance}
              onChange={toggleMaintenance}
              disabled={isLoading}
            />
            <div
              className={`
        relative w-14 h-7 bg-gray-300 rounded-full 
        transition-colors duration-300 ease-in-out
        ${isMaintenance ? "bg-blue-500" : "bg-gray-300"}
      `}
            >
              <span
                className={`
          inline-block w-5 h-5 rounded-full bg-white border border-gray-300
          transform translate-y-[2px]
          transition-transform duration-300 ease-in-out
          ${isMaintenance ? "translate-x-8" : "translate-x-1"}
        `}
              ></span>
            </div>
          </label>
        </div>

        {isLoading && (
          <p className="mt-2 text-sm text-blue-500">Menyimpan perubahan...</p>
        )}
        {message && (
          <p
            className={`mt-2 text-sm ${
              message.includes("Berhasil") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6">
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
              isMaintenance
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {isMaintenance ? "Maintenance Mode Aktif" : "Operasional Normal"}
          </span>
        </div>
      </div>
    </div>
  );
}
