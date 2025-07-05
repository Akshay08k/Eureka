import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-800 text-purple-400 hover:bg-gray-700 hover:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg transition-colors ${
            currentPage === page
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
              : "border border-gray-400 bg-gray-300 dark:border-gray-700 dark:bg-gray-800 text-purple-400 hover:bg-gray-700 hover:border-purple-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-700 hover:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
