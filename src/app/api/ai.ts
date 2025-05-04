const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/ai`;

export const sendQueryToBackend = async ({
  query,
  workspaceId,
  materialId,
  contentBlockId,
  type,
}: {
  query: string;
  workspaceId: string;
  materialId: string;
  contentBlockId: string;
  type: string;
}): Promise<any> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        workspaceId,
        materialId,
        contentBlockId,
        type,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mendapatkan data AI.");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Respons bukan JSON valid.");
    }
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan saat mengambil data AI.");
  }
};

export const getDataAi = async ({
  workspaceId,
  materialId,
  contentBlockId,
  type,
}: {
  workspaceId: string;
  materialId: string;
  contentBlockId: string;
  type: string;
}): Promise<any> => {
  try {
    const response = await fetch(
      `${API_URL}?workspaceId=${workspaceId}&materialId=${materialId}&contentBlockId=${contentBlockId}&type=${type}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mendapatkan data AI.");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Respons bukan JSON valid.");
    }
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan saat mengambil data AI.");
  }
};
