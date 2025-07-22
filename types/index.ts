interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
  createdAt: Date;
}

interface NotePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, "id" | "createdAt">) => void;
  existingNote?: Note;
}

export type { Tag, Note, NotePopupProps };