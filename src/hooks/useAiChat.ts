import { useState } from "react";
import { initAiChat, sendChat } from "@/app/api/aiChat";

export const useAiChat = (workspaceId: string) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false); // <-- tambahin ini

  const startSession = async () => {
    try {
      await initAiChat(workspaceId);
      setSessionStarted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err?.message?.includes("Unauthorized")) {
          setUnauthorized(true);
          return;
        }
        setMessages((prev) => [
          ...prev,
          { role: "error", content: err?.message || "Gagal memulai sesi AI." },
        ]);
      }
    }
  };

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const res = await sendChat(workspaceId, input);

      if (res?.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.response },
        ]);
      } else if (res?.message) {
        if (res.message.includes("Unauthorized")) {
          setUnauthorized(true);
          return;
        }
        setMessages((prev) => [
          ...prev,
          { role: "error", content: res.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "error", content: "Terjadi kesalahan tak terduga." },
        ]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err?.message?.includes("Unauthorized")) {
          setUnauthorized(true);
          return;
        }
        setMessages((prev) => [
          ...prev,
          {
            role: "error",
            content: err?.message || "Tidak bisa terhubung ke server.",
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
    startSession,
    sessionStarted,
    unauthorized,
  };
};
