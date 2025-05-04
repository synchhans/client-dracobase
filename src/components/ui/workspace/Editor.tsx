import React, { useEffect, useState } from "react";
import { emmetHTML, emmetJSX } from "emmet-monaco-es";
import { OnMount } from "@monaco-editor/react";
import { Editor } from "@monaco-editor/react";

interface EditorProps {
  language: string;
  code: string;
  onChange: (value: string) => void;
}

const MaterialEditor: React.FC<EditorProps> = ({
  language,
  code,
  onChange,
}) => {
  const [MonacoEditor, setMonacoEditor] = useState<typeof Editor | null>(null);

  useEffect(() => {
    import("@monaco-editor/react").then((module) => {
      setMonacoEditor(() => module.Editor);
    });
  }, []);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    if (editor) {
      switch (language) {
        case "html":
          emmetHTML(monaco);
          break;
        case "javascript":
          emmetJSX(monaco);
          break;
        default:
          console.warn(`No Emmet support for language: ${language}`);
      }
    }
  };

  if (!MonacoEditor) {
    return <div>Loading editor...</div>;
  }

  return (
    <MonacoEditor
      height="320px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value: string | undefined) => onChange(value || "")}
      onMount={handleEditorDidMount}
      options={{
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        tabCompletion: "onlySnippets",
        readOnly: false,
        minimap: { enabled: false },
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        fontSize: 14,
        tabSize: 2,
      }}
    />
  );
};

export default MaterialEditor;