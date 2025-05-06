import { Recent } from "@/types/recent.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/recent`;

export const apiGetRecents = async (): Promise<Recent[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengambil data recent.");
    }

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengambil data recent.");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error("Respons bukan JSON valid.");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        err.message || "Terjadi kesalahan saat mengambil data recent."
      );
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat mengambil data recent."
      );
    }
  }
};

export const apiDeleteRecent = async (recentId: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal menghapus data recent.");
    }
    const response = await fetch(`${API_URL}/${recentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal menghapus recent.");
    }
  } catch (error) {
    console.error("Error deleting recent:", error);
    throw error;
  }
};
