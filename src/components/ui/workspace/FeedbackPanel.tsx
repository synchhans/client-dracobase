import React from "react";
import MarkdownRenderer from "./MarkDownRenderer";
import { motion } from "framer-motion";

interface AIFeedbackProps {
  query: string;
  response: string;
}

const AIFeedbackPanel: React.FC<AIFeedbackProps> = ({ query, response }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg duration-300 my-6"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        🤖 Hasil Feedback
      </h3>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          📝 Query:
        </label>
        <pre className="bg-gray-50 border border-gray-300 p-3 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap break-words font-mono text-gray-800">
          <code>{query}</code>
        </pre>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          💡 Response:
        </label>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-lg markdown-content prose max-w-none prose-p:my-2 prose-code:bg-blue-50 prose-code:text-blue-800 prose-code:rounded-md prose-code:inline-block prose-code:px-1 prose-code:py-0.5 prose-h2:text-lg prose-h3:text-base">
          <MarkdownRenderer content={response} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIFeedbackPanel;
