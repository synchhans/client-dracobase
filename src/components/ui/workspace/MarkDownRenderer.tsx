import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula";
import SyntaxHighlighter from "react-syntax-highlighter";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({
          inline,
          className,
          children,
          ...props
        }: React.HTMLAttributes<HTMLElement> & {
          inline?: boolean;
          className?: string;
        }) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match?.[1] || "";

          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              language={language}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className="px-1.5 py-0.5 rounded bg-gray-200 text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
