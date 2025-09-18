import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";

interface AssistantMessageProps {
  content: string;
  idx: number;
  copiedIndex: string | null;
  handleCopy: (text: string, key: string) => void;
}

function parseMessageContent(content: string) {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  const result: { type: string; content: string; lang?: string }[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        type: "text",
        content: content.slice(lastIndex, match.index),
      });
    }
    result.push({ type: "code", content: match[2], lang: match[1] || "text" });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < content.length) {
    result.push({ type: "text", content: content.slice(lastIndex) });
  }

  return result;
}

export function AssistantMessage({
  content,
  idx,
  copiedIndex,
  handleCopy,
}: AssistantMessageProps) {
  const parts = parseMessageContent(content);

  return (
    <div className="bg-white text-gray-800 border rounded-2xl shadow p-3 space-y-3 max-w-lg">
      {parts.map((part, i) =>
        part.type === "code" ? (
          <div
            key={i}
            className="relative bg-gray-900 text-white rounded-md p-3 font-mono text-sm overflow-x-auto"
          >
            <pre>{part.content}</pre>
            <button
              onClick={() => handleCopy(part.content, `${idx}-${i}`)}
              className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {copiedIndex === `${idx}-${i}` ? "Copied!" : <Copy size={14} />}
            </button>
          </div>
        ) : (
          <div key={i} className="prose prose-sm max-w-none">
            <ReactMarkdown>{part.content}</ReactMarkdown>
          </div>
        )
      )}
    </div>
  );
}
