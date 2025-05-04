import React from "react";
import MarkdownRenderer from "./MarkDownRenderer";
import { motion } from "framer-motion";

interface DebuggerProps {
  debugLogs?: string;
}

const DebuggerPanel: React.FC<DebuggerProps> = ({ debugLogs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="p-6 my-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        🤖 Hasil Debugging
      </h3>

      {debugLogs ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="markdown-content prose max-w-none prose-p:my-2 prose-code:bg-indigo-50 prose-code:text-indigo-800 prose-code:rounded-md prose-code:inline-block prose-code:px-1.5 prose-code:py-0.5 prose-h2:text-lg prose-h3:text-base prose-li:my-1">
            <MarkdownRenderer content={debugLogs} />
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-500 italic text-sm">
          Belum ada data debugging diterima.
        </p>
      )}
    </motion.div>
  );
};

export default DebuggerPanel;