import { Language } from "@/types/language.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/language`;

export const apiAddLanguage = async (data: Language): Promise<Language> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal menambah data language.");
    }
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Gagal menambahkan bahasa pemrograman."
      );
    }

    return await response.json();
  } catch (err) {
    console.error((err as Error).message || "Terjadi kesalahan tak terduga.");
    throw err;
  }
};

export const apiUpdateLanguage = async (
  name: string,
  data: Language
): Promise<Language> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengupdate data language.");
    }
    const response = await fetch(`${API_URL}/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Gagal memperbarui bahasa pemrograman."
      );
    }

    return await response.json();
  } catch (err) {
    console.error((err as Error).message || "Terjadi kesalahan tak terduga.");
    throw err;
  }
};

export const apiDeleteLanguage = async (languageId: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal menghapus data language.");
    }
    const response = await fetch(`${API_URL}/${languageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Gagal menghapus bahasa pemrograman."
      );
    }
  } catch (err) {
    console.error((err as Error).message || "Terjadi kesalahan tak terduga.");
    throw err;
  }
};

export const apiGetLanguages = async (): Promise<Language[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengambil data language.");
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
      throw new Error(errorData.message || "Gagal mengambil data bahasa.");
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
        err.message || "Terjadi kesalahan saat mengambil data bahasa."
      );
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat mengambil data bahasa."
      );
    }
  }
};
