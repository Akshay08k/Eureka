import { useState, useEffect } from "react";
import { MdClose, MdSave, MdCancel } from "react-icons/md";
import NoteEditor from "./TextEditor";
import { NotePopupProps } from "../../../../types";

const NotePopup: React.FC<NotePopupProps> = ({
  isOpen,
  onClose,
  onSave,
  editingNote,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote, isOpen]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title: title.trim(), content });
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  backdrop-blur flex items-center justify-center p-4 z-50 animate-fadeIn ">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideIn ">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingNote ? "Edit Note" : "Create New Note"}
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MdClose className="text-gray-500 dark:text-gray-400" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
              Content
            </label>
            <NoteEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your note..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MdCancel size={16} />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            <MdSave size={16} />
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePopup;
