interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

interface NotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  editingNote?: Note;
}

interface NoteViewerProps {
  note: Note;
  onBack: () => void;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

interface NotesPageProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  onView: (note: Note) => void;
}
export type {
  Tag,
  Note,
  NotePopupProps,
  NoteTextEditorProps,
  NoteViewerProps,
  NotesPageProps,
};
