import { Recent } from "@/types/recent.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/recent`;

export const apiGetRecents = async (): Promise<Recent[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      credentials: "include",
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
  } catch (err: any) {
    throw new Error(
      err.message || "Terjadi kesalahan saat mengambil data recent."
    );
  }
};

export const apiDeleteRecent = async (recentId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${recentId}`, {
      method: "DELETE",
      credentials: "include",
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
