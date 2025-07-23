import { useEffect, useRef } from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdLink,
  MdImage,
} from "react-icons/md";

import { NoteTextEditorProps } from "../../../../types";

const NoteEditor: React.FC<NoteTextEditorProps> = ({
  content,
  onChange,
  placeholder,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      handleCommand("createLink", url);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      handleCommand("insertImage", url);
    }
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
        <button
          type="button"
          onClick={() => handleCommand("bold")}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Bold"
        >
          <MdFormatBold className="text-gray-700 dark:text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("italic")}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Italic"
        >
          <MdFormatItalic className="text-gray-700 dark:text-gray-300" />
        </button>
        <button
          type="button"
          onClick={() => handleCommand("underline")}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Underline"
        >
          <MdFormatUnderlined className="text-gray-700 dark:text-gray-300" />
        </button>
        <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>
        <button
          type="button"
          onClick={insertLink}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Insert Link"
        >
          <MdLink className="text-gray-700 dark:text-gray-300" />
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title="Insert Image"
        >
          <MdImage className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[200px] focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        style={{ wordWrap: "break-word" }}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default NoteEditor;
