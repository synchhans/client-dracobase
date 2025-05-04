import { Workspace } from "@/types/workspace.types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces`;

export const apiCreateWorkspace = async (
  userId: string,
  name: string,
  description: string,
  languageId: string
): Promise<Workspace> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId,
        name,
        description,
        languageId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal membuat workspace.");
    }

    return await response.json();
  } catch (err) {
    console.error((err as Error).message || "Terjadi kesalahan tak terduga.");
    throw err;
  }
};

export const apiGetWorkspace = async (id: string): Promise<Workspace> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mengambil data workspace.");
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
        err.message || "Terjadi kesalahan saat mengambil data workspace."
      );
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat mengambil data workspace."
      );
    }
  }
};
