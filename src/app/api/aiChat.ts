const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/ai-chat`;

export const initAiChat = async (workspaceId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ada.");

  const res = await fetch(`${API_URL}/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ workspaceId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};

export const sendChat = async (workspaceId: string, query: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ada.");

  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ workspaceId, query }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
};
