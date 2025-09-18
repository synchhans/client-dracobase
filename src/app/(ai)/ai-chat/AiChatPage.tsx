"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAiChat } from "@/hooks/useAiChat";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { ArrowLeft, FileDown, Send } from "lucide-react";
import { AssistantMessage } from "@/components/ui/workspace/AssistantMessage";

export default function AiChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") || "";
  const {
    messages,
    sendMessage,
    isLoading,
    startSession,
    sessionStarted,
    unauthorized,
  } = useAiChat(workspaceId);

  const [input, setInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    alert(
      "⚠️ Catatan: Chat AI tidak disimpan.\n" +
        "Jika kamu keluar atau refresh, percakapan akan hilang.\n" +
        "Pastikan copy kode atau export PDF sebelum keluar."
    );
    startSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Chat akan hilang. Yakin mau keluar?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      try {
        window.close();
        window.location.href = "about:blank";
      } catch {
        window.location.href = "about:blank";
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const sanitizeForPdf = (text: string) => {
    if (!text) return "";
    return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  };

  const exportPDF = (
    messages: { role: string; content: string }[],
    workspaceId?: string
  ) => {
    if (messages.filter((m) => m.role === "assistant").length === 0) {
      alert("Belum ada jawaban AI untuk disimpan ke PDF.");
      return;
    }

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    const maxWidth = pageWidth - margin * 2;
    const lineHeight = 14;
    let y = margin;

    const roleLabel = (role: string) => {
      if (role === "user") return "USER";
      if (role === "assistant") return "ASSISTANT";
      return "ERROR";
    };

    const parseSegments = (content: string) => {
      const parts: { type: "text" | "code"; content: string; lang?: string }[] =
        [];
      const regex = /```(\w+)?\n([\s\S]*?)```/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            content: content.slice(lastIndex, match.index),
          });
        }
        parts.push({
          type: "code",
          content: match[2],
          lang: match[1] || "text",
        });
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < content.length) {
        parts.push({ type: "text", content: content.slice(lastIndex) });
      }

      return parts;
    };

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };

    messages.forEach((m) => {
      const label = roleLabel(m.role);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      ensureSpace(lineHeight * 1.6);
      doc.text(label, margin, y);
      y += lineHeight * 1.2;

      const content = sanitizeForPdf(m.content);
      const segments = parseSegments(content);

      segments.forEach((seg) => {
        if (seg.type === "text") {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          const lines = doc.splitTextToSize(seg.content.trim() || "", maxWidth);
          lines.forEach((ln: string) => {
            ensureSpace(lineHeight);
            doc.text(ln, margin, y);
            y += lineHeight;
          });
        } else {
          const code = seg.content
            .replace(/\r\n/g, "\n")
            .replace(/\t/g, "    ");
          const codeLines = code.split("\n");
          const codeFontSize = 10;
          const codeLineHeight = codeFontSize * 1.35;
          const boxPadding = 6;
          // compute box height
          const boxHeight = codeLines.length * codeLineHeight + boxPadding * 2;
          ensureSpace(boxHeight + 6);

          doc.setFillColor(245, 245, 247);
          doc.rect(margin, y, maxWidth, boxHeight, "F");

          doc.setFont("courier", "normal");
          doc.setFontSize(codeFontSize);
          let cy = y + boxPadding + codeFontSize;
          codeLines.forEach((cl) => {
            const wrapped = doc.splitTextToSize(cl, maxWidth - boxPadding * 2);
            wrapped.forEach((wln: string) => {
              ensureSpace(codeLineHeight);
              doc.text(wln, margin + boxPadding, cy);
              cy += codeLineHeight;
            });
          });

          y += boxHeight + 6;
        }
      });

      y += lineHeight * 0.5;
    });

    const date = new Date().toISOString().replace(/[:.]/g, "-").split("T")[0];
    const workspacePart = workspaceId ? `${workspaceId}-` : "";
    const fileName = `chat-ai-${workspacePart}${date}.pdf`;

    doc.save(fileName);
  };

  if (unauthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center gap-4">
        <h2 className="text-xl font-bold text-red-600">
          Sesi kamu sudah berakhir
        </h2>
        <p className="text-gray-600">
          Silakan login kembali untuk menggunakan AI Chat Edukatif.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Login Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="p-4 bg-white shadow-md flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-bold text-indigo-700">
            🤖 AI Chat Edukatif
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md">
            Tanyakan seputar HTML, CSS, dan JavaScript. Jangan lupa simpan hasil
            chatmu!
          </p>
        </div>

        <div className="flex justify-center sm:justify-end gap-2">
          <button
            onClick={() => {
              if (confirm("Chat akan hilang. Yakin mau keluar?")) {
                try {
                  window.close();
                  window.location.href = "about:blank";
                } catch {
                  window.location.href = "about:blank";
                }
              }
            }}
            className="flex items-center gap-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base"
          >
            <ArrowLeft size={16} /> Kembali
          </button>

          <button
            onClick={() => exportPDF(messages, workspaceId)} // <-- dibungkus
            disabled={
              messages.filter((m) => m.role === "assistant").length === 0
            }
            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm sm:text-base disabled:opacity-50"
          >
            <FileDown size={16} /> Simpan PDF
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" ? (
              <AssistantMessage
                content={msg.content}
                idx={idx}
                copiedIndex={copiedIndex}
                handleCopy={(text: string, id: string) => {
                  navigator.clipboard.writeText(text);
                  setCopiedIndex(id);
                  setTimeout(() => setCopiedIndex(null), 2000);
                }}
              />
            ) : (
              <div className="bg-indigo-500 text-white rounded-2xl rounded-br-none shadow p-3 max-w-lg">
                {msg.content}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border rounded-2xl px-4 py-2 shadow">
              <span className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white shadow-inner">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!sessionStarted || isLoading}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none disabled:opacity-50"
            placeholder="Tanyakan ke AI (HTML, CSS, JS)..."
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !sessionStarted}
            className="p-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
