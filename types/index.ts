import { InferSchemaType } from "mongoose";
import User from "@/models/User";

export type User = InferSchemaType<typeof User>;
export type UpdateUserReq = Partial<User> & { email: string };

export interface ToastState {
  show: boolean;
  type: "success" | "error" | "warning" | "info";
  message: string;
  title?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export interface NotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  editingNote?: Note;
}

export interface NoteViewerProps {
  note: Note;
  onBack: () => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export interface NotesPageProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onView: (note: Note) => void;
}
