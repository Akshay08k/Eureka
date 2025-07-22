"use client";
import React, { useState, useRef, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import {
  FiX,
  FiSave,
  FiTag,
  FiPlus,
  FiFileText,
  FiHash,
  FiCheck,
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
} from "react-icons/fi";
import { Tag, NotePopupProps, Note } from "../../types";
import ToolbarButton from "./toolbar";
const NotePopup: React.FC<NotePopupProps> = ({
  isOpen,
  onClose,
  onSave,
  existingNote,
}) => {
  const [title, setTitle] = useState(existingNote?.title || "");
  const [content, setContent] = useState(existingNote?.content || "");
  const [tags, setTags] = useState<Tag[]>(existingNote?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: existingNote?.content || "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML().trim());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setTags(existingNote.tags);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [existingNote]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const tagColors = [
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  ];

  const addTag = () => {
    if (
      !newTag.trim() ||
      tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())
    ) {
      setNewTag("");
      return;
    }

    const newTagObj: Tag = {
      id: Date.now().toString(),
      name: newTag.trim(),
      color: tagColors[Math.floor(Math.random() * tagColors.length)],
    };

    setTags([...tags, newTagObj]);
    setNewTag("");
    setShowTagInput(false);
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addTag();
    }
  };

  if (!isOpen) return null;

  const modalSize = isMobile
    ? "fixed inset-0"
    : "fixed inset-0 flex items-center justify-center p-2 sm:p-4";

  const contentSize = isMobile
    ? "w-full h-full"
    : "w-full max-w-4xl max-h-[95vh] lg:max-w-5xl xl:max-w-6xl";

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50">
      <div className={modalSize}>
        <div
          className={`${contentSize} bg-white dark:bg-gray-800 ${
            isMobile ? "rounded-lg shadow-lg" : "rounded-2xl shadow-2xl"
          } flex flex-col overflow-hidden`}
        >
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {existingNote ? "Edit Note" : "Create New Note"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 min-h-0">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-600
                         rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                         focus:border-transparent transition-all duration-200
                         placeholder-gray-500 dark:placeholder-gray-400"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tags
                </label>
                {!showTagInput && (
                  <button
                    onClick={() => setShowTagInput(true)}
                    className="flex items-center gap-1 text-xs sm:text-sm text-indigo-600 dark:text-indigo-400
                             hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    Add Tag
                  </button>
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${tag.color}`}
                    >
                      <FiHash className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {tag.name}
                      <button
                        onClick={() => removeTag(tag.id)}
                        className="ml-0.5 sm:ml-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                      >
                        <FiX className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {showTagInput && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter tag name..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                               focus:border-transparent transition-all duration-200
                               placeholder-gray-500 dark:placeholder-gray-400"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={addTag}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                             text-white rounded-lg transition-colors"
                  >
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setShowTagInput(false);
                      setNewTag("");
                    }}
                    className="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500
                             text-gray-600 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <ToolbarButton
              icon={FiBold}
              action={() => editor?.chain().focus().toggleBold().run()}
              label="Bold"
            />
            <ToolbarButton
              icon={FiItalic}
              action={() => editor?.chain().focus().toggleItalic().run()}
              label="Italic"
            />
            <ToolbarButton
              icon={FiUnderline}
              action={() => editor?.chain().focus().toggleUnderline().run()}
              label="Underline"
            />
          </div>

          <EditorContent
            editor={editor}
            className="
          min-h-[200px] max-h-[600px] overflow-y-auto border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-750 p-4 sm:p-6 rounded-xl sm:rounded-2xl focus:outline-none"
          />
          <div className="flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 shrink-0">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700
                       border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50
                       dark:hover:bg-gray-600 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!title.trim()) return;
                onSave({
                  // id: existingNote?.id || Date.now().toString(),
                  title: title.trim(),
                  content: editor?.getHTML() || "",
                  tags,
                });
                onClose();
              }}
              disabled={!title.trim() || !editor}
              className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700
                       dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl
                       transition-all duration-200 font-medium disabled:opacity-50
                       disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20
                       dark:shadow-indigo-500/20"
            >
              <FiSave className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {existingNote ? "Update Note" : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSaveNote = (noteData: Omit<Note, "id" | "createdAt">) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Eureka Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Capture your thoughts and ideas with ease
          </p>
        </div>

        {/* Add Note Button */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700
                   dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-xl
                   transition-all duration-200 font-medium shadow-lg shadow-indigo-600/20
                   dark:shadow-indigo-500/20 mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          Create New Note
        </button>

        {/* Notes List */}
        <div className="grid gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm
                       border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {note.title}
                </h3>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {note.createdAt.toLocaleDateString()}
                </span>
              </div>

              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                  {note.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className={`inline-flex items-center gap-1 px-2 sm:px-2 py-1 rounded-full text-xs font-medium ${tag.color}`}
                    >
                      <FiHash className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <div
                className="text-gray-700 dark:text-gray-300 text-sm sm:text-base prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiFileText className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
              No notes yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Create your first note to get started
            </p>
          </div>
        )}
      </div>

      <NotePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveNote}
      />
    </div>
  );
};

export default App;
