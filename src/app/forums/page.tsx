"use client";
import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiMessageSquare,
  FiHeart,
  FiUser,
  FiCalendar,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiArrowUp,
} from "react-icons/fi";
import FilterSortControls from "./components/FilterControls";
import ForumHeader from "./components/FormHeader";
import ThreadCard from "./components/ThreadCard";
import ThreadDetails from "./components/ThreadDetails";
import ThreadDetail from "./components/ThreadDetails";
import Pagination from "./components/Pagination";

// Types
interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface Reply {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
}
// Sample data with dark mode tag colors

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9ce0804?w=32",
  },
  {
    id: "2",
    name: "Bob Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32",
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32",
  },
];

const sampleTags: any = [
  {
    id: "1",
    name: "AI",
  },
  {
    id: "2",
    name: "Web Dev",
  },
  {
    id: "3",
    name: "Data Science",
  },
  {
    id: "4",
    name: "Machine Learning",
  },
];

const sampleThreads: any = [
  {
    id: "1",
    title: "How to implement neural networks from scratch?",
    preview:
      "I'm trying to understand the fundamentals of neural networks by building one from scratch using Python. What are the key concepts I should focus on?",
    author: "sampleUsers[0]",
    tags: [sampleTags[0], sampleTags[3]],
    replies: 15,
    likes: 23,
    createdAt: new Date("2025-06-25"),
    lastActivity: new Date("2025-06-27"),
    isAnswered: true,
  },
  {
    id: "2",
    title: "Best practices for React TypeScript project structure?",
    preview:
      "Looking for advice on organizing a large-scale React TypeScript application. How do you structure your components, hooks, and utilities?",
    author: "sampleUsers[1]",
    tags: [sampleTags[1]],
    replies: 8,
    likes: 12,
    createdAt: new Date("2025-06-26"),
    lastActivity: new Date("2025-06-26"),
    isAnswered: false,
  },
  {
    id: "3",
    title: "Data preprocessing techniques for time series analysis",
    preview:
      "What are the most effective preprocessing steps when working with time series data? I'm particularly interested in handling missing values and outliers.",
    author: "sampleUsers[2]",
    tags: [sampleTags[2], sampleTags[0]],
    replies: 6,
    likes: 18,
    createdAt: new Date("2025-06-24"),
    lastActivity: new Date("2025-06-25"),
    isAnswered: true,
  },
  {
    id: "4",
    title: "Data preprocessing techniques for time series analysis",
    preview:
      "What are the most effective preprocessing steps when working with time series data? I'm particularly interested in handling missing values and outliers.",
    author: " sampleUsers[2]",
    tags: [sampleTags[2], sampleTags[0]],
    replies: 6,
    likes: 18,
    createdAt: new Date("2025-06-24"),
    lastActivity: new Date("2025-06-25"),
    isAnswered: true,
  },
];

// Main Forum Component
const ForumPage: React.FC = () => {
  const [selectedThread, setSelectedThread] = useState<any | null>(null);
  const [sortBy, setSortBy] = useState("latest");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const threadsPerPage = 10;
  const totalPages = Math.ceil(sampleThreads.length / threadsPerPage);

  const filteredThreads = sampleThreads.filter((thread: any) => {
    if (
      selectedTag &&
      !thread.tags.some((tag: any) => tag.name === selectedTag)
    ) {
      return false;
    }

    if (sortBy === "unanswered" && thread.isAnswered) {
      return false;
    }

    if (sortBy === "answered" && !thread.isAnswered) {
      return false;
    }

    return true;
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.likes - a.likes;
      case "latest":
        return b.lastActivity.getTime() - a.lastActivity.getTime();
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const paginatedThreads = sortedThreads.slice(
    (currentPage - 1) * threadsPerPage,
    currentPage * threadsPerPage
  );

  if (selectedThread) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 ">
        <div className="pt-16">
          <ThreadDetail
            thread={selectedThread}
            onBack={() => setSelectedThread(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white  dark:bg-gray-900 dark:text-white">
      <div className="pt-16">
        <ForumHeader />

        <FilterSortControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          tags={sampleTags}
          Threads={sampleThreads}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
          <div className="space-y-4">
            {paginatedThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                onClick={setSelectedThread}
              />
            ))}
          </div>

          {filteredThreads.length === 0 && (
            <div className="text-center py-12">
              <FiMessageSquare className="w-12 h-12 text-gray-600  dark:text-white mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white dark:text-whit mb-2">
                No discussions found
              </h3>
              <p className="text-gray-400 dark:text-gray-400">
                Try adjusting your filters or be the first to ask a question!
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
