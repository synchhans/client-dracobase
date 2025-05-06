const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/ai`;

type AiResponse = {
  _id: string;
  userId: string;
  workspaceId: string;
  materialId: string;
  contentBlockId: string;
  query: string;
  response: string;
  feedbackType: "debugging" | "feedback";
  createdAt: Date;
  updatedAt: Date;
};

type GetAiResponse = {
  success: string;
  data: AiResponse[];
};

type SendAiResponse = {
  success: string;
  data: AiResponse;
};

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
}): Promise<SendAiResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengirim data ke ai.");
    }
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        err.message || "Terjadi kesalahan saat mengambil data AI."
      );
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat mengambil data AI."
      );
    }
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
}): Promise<GetAiResponse> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Gagal mengambil data ai.");
    }
    const response = await fetch(
      `${API_URL}?workspaceId=${workspaceId}&materialId=${materialId}&contentBlockId=${contentBlockId}&type=${type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        err.message || "Terjadi kesalahan saat mengambil data AI."
      );
    } else {
      throw new Error(
        "Terjadi kesalahan tidak terduga saat mengambil data AI."
      );
    }
  }
};
