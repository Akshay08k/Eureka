import React from "react";
import { FiTag, FiCalendar, FiMessageSquare, FiHeart } from "react-icons/fi";

const ThreadCard: React.FC<{
  thread: any;
  onClick: (thread: any) => void;
}> = ({ thread, onClick }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className="bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer group"
      onClick={() => onClick(thread)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-black dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
          {thread.title}
        </h3>
        {thread.isAnswered && (
          <span className="ml-3 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-200/2 text-green-400 dark:bg-green-900/30 dark:text-green-400 border dark:border-green-700/50 shrink-0">
            Answered
          </span>
        )}
      </div>

      <p className="text-black dark:text-gray-300 text-sm line-clamp-2 mb-4">
        {thread.preview}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {thread.tags.map((tag: any) => (
          <span
            key={tag.id}
            className={`text-white/80 dark:text-gray-200 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-600 dark:bg-gray-700`}
          >
            <FiTag className="w-3 h-3 mr-1 text-white dark:text-black" />
            {tag.name}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img
              src={thread.author.avatar}
              alt={thread.author.name}
              className="w-6 h-6 rounded-full ring-2 ring-purple-500/20"
            />
            <span className="text-sm text-gray-200">{thread.author.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <FiCalendar className="w-3 h-3 mr-1" />
            {formatDate(thread.createdAt)}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-800 dark:text-gray-400">
          <div className="flex items-center  transition-colors">
            <FiMessageSquare className="w-4 h-4 mr-1" />
            {thread.replies}
          </div>
          <div className="flex items-center transition-colors">
            <FiHeart className="w-4 h-4 mr-1" />
            {thread.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
