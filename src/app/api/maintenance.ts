import { MaintenanceStatus } from "@/types/maintenance.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance`;

export const apiGetMaintenanceStatus = async (): Promise<MaintenanceStatus> => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`${API_URL}?t=${timestamp}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Gagal mengambil status maintenance."
      );
    }

    const json = await response.json();

    if (!json.success || !json.data) {
      throw new Error("Format respons tidak valid.");
    }

    return json.data;
  } catch (err: any) {
    console.error("Error fetching maintenance status:", err.message);
    throw new Error(err.message || "Terjadi kesalahan saat mengambil status.");
  }
};

export const apiToggleMaintenance = async (
  enabled: boolean
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ enabled }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Gagal memperbarui status maintenance."
      );
    }

    const json = await response.json();

    if (!json.success) {
      throw new Error(json.message || "Gagal toggle maintenance");
    }

    return {
      success: true,
      message: json.message,
    };
  } catch (err: any) {
    console.error("Error toggling maintenance:", err.message);
    throw err;
  }
};
