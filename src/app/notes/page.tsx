"use client";
import React, { useState } from "react";
import { MdNoteAdd } from "react-icons/md";
import { Note } from "../../../types";
import NotesPage from "./components/Notes";
import NoteViewer from "./components/NoteViewer";
import NotePopup from "./components/NotesTakingUp";

const NotesApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<"list" | "view">("list");
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to Notes",
      content:
        "<p>This is your first note! You can <strong>format text</strong>, add <em>emphasis</em>, and even <u>underline</u> content.</p><p>Try creating a new note with the + button!</p>",
      createdAt: new Date("2024-01-15T10:30:00"),
      updatedAt: new Date("2024-01-15T10:30:00"),
    },
    {
      id: "2",
      title: "Meeting Notes",
      content:
        "<p>Discussed project timeline and deliverables:</p><ul><li>Phase 1: Design mockups</li><li>Phase 2: Development</li><li>Phase 3: Testing</li></ul>",
      createdAt: new Date("2024-01-16T14:00:00"),
      updatedAt: new Date("2024-01-16T14:15:00"),
    },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSaveNote = (
    noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = new Date();

    if (editingNote) {
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? { ...note, ...noteData, updatedAt: now }
            : note
        )
      );
      setEditingNote(undefined);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        ...noteData,
        createdAt: now,
        updatedAt: now,
      };
      setNotes([newNote, ...notes]);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsPopupOpen(true);
    setCurrentView("list");
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  const handleViewNote = (note: Note) => {
    setViewingNote(note);
    setCurrentView("view");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setViewingNote(null);
  };

  const openNewNote = () => {
    setEditingNote(undefined);
    setIsPopupOpen(true);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors pt-28">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              📝 Notes App
            </h1>

            <div className="flex items-center gap-3">
              {currentView === "list" && (
                <button
                  onClick={openNewNote}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <MdNoteAdd size={20} />
                  New Note
                </button>
              )}
            </div>
          </div>

          {currentView === "list" ? (
            <NotesPage
              notes={notes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onView={handleViewNote}
            />
          ) : (
            viewingNote && (
              <NoteViewer
                note={viewingNote}
                onBack={handleBackToList}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            )
          )}

          <NotePopup
            isOpen={isPopupOpen}
            onClose={() => {
              setIsPopupOpen(false);
              setEditingNote(undefined);
            }}
            onSave={handleSaveNote}
            editingNote={editingNote}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        .dark [contenteditable]:empty:before {
          color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default NotesApp;
