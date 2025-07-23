import { MdNoteAdd, MdDelete, MdEdit } from "react-icons/md";
import { NotesPageProps } from "../../../../types";

const NotesPage: React.FC<NotesPageProps> = ({
  notes,
  onEdit,
  onDelete,
  onView,
}) => {
  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const getContentSnippet = (content: string, maxLength: number = 100) => {
    const text = stripHtml(content);
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        My Notes
      </h2>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <MdNoteAdd
            className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
            size={64}
          />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No notes yet
          </p>
          <p className="text-gray-400 dark:text-gray-500">
            Click the + button to create your first note
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 cursor-pointer"
              onClick={() => onView(note)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
                    {note.title}
                  </h3>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(note);
                      }}
                      className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Edit note"
                    >
                      <MdEdit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(note.id);
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Delete note"
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                  {getContentSnippet(note.content)}
                </p>

                <div className="text-xs text-gray-400 dark:text-gray-500">
                  {note.updatedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
