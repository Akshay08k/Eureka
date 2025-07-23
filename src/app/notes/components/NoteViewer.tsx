import { MdArrowBack, MdDelete, MdEdit } from "react-icons/md";
import { NoteViewerProps } from "../../../../types";
const NoteViewer: React.FC<NoteViewerProps> = ({
  note,
  onBack,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      onDelete(note.id);
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <MdArrowBack size={20} />
          Back to Notes
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <MdEdit size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <MdDelete size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {note.title}
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created:{" "}
              {note.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                <span className="ml-4">
                  Updated:{" "}
                  {note.updatedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              className="text-gray-800 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html:
                  note.content ||
                  '<p class="text-gray-500 dark:text-gray-400 italic">This note is empty.</p>',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default NoteViewer