import React from "react";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import ForumQuestion from "@/app/components/ForumQuestion";

const ForumHeader: React.FC = () => {
  const [isQuestionBoxOpen, setIsQuestionBoxOpen] = useState(false);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Community Forum
          </h1>
          <button
            onClick={() => setIsQuestionBoxOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Ask a Question
          </button>
          <ForumQuestion
            isOpen={isQuestionBoxOpen}
            onClose={() => setIsQuestionBoxOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;
