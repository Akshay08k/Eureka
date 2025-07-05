import React from "react";
import { FiChevronDown, FiFilter } from "react-icons/fi";

const FilterSortControls: React.FC<{
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  tags: any; //tag[]
  Threads: any; //ForumThread[];
}> = ({ sortBy, setSortBy, selectedTag, setSelectedTag, tags, Threads }) => {
  return (
    <div className="bg-white dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap items-center space-x-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white text-black dark:text-white dark:bg-gray-800 outline outline-gray-700 rounded-lg px-4 py-2 pr-8 text-sm  focus:outline-none focus:ring-2  transition-colors"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="unanswered">Unanswered</option>
                <option value="answered">Answered</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-800 dark:text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="appearance-none bg-white text-black dark:text-white dark:bg-gray-800 outline outline-gray-700 rounded-lg px-4 py-2 pr-8 text-sm  focus:outline-none focus:ring-2  transition-colors"
              >
                <option value="">All Tags</option>
                {tags.map((tag: any) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <FiFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Showing {Threads.length} discussions
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSortControls;
