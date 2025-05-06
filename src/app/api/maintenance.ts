import { MaintenanceStatus } from "@/types/maintenance.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/maintenance`;

export const apiGetMaintenanceStatus = async (): Promise<MaintenanceStatus> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengambil data maintenance.");
    }
    const timestamp = new Date().getTime();
    const response = await fetch(`${API_URL}?t=${timestamp}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        err.message || "Terjadi kesalahan saat mengambil status."
      );
    } else {
      throw new Error("Terjadi kesalahan tidak terduga saat mengambil status.");
    }
  }
};

export const apiToggleMaintenance = async (
  enabled: boolean
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal memperbarui status maintenance.");
    }
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error toggling maintenance:", err.message);
    } else {
      console.error("Error tak terduga toggling maintenance!");
    }
    throw err;
  }
};
