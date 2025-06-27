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

interface ForumThread {
  id: string;
  title: string;
  preview: string;
  author: User;
  tags: Tag[];
  replies: number;
  likes: number;
  createdAt: Date;
  lastActivity: Date;
  isAnswered: boolean;
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
const sampleTags: Tag[] = [
  {
    id: "1",
    name: "AI",
    color: "bg-purple-900/30 text-purple-300 border border-purple-700/50",
  },
  {
    id: "2",
    name: "Web Dev",
    color: "bg-indigo-900/30 text-indigo-300 border border-indigo-700/50",
  },
  {
    id: "3",
    name: "Data Science",
    color: "bg-blue-900/30 text-blue-300 border border-blue-700/50",
  },
  {
    id: "4",
    name: "Machine Learning",
    color: "bg-violet-900/30 text-violet-300 border border-violet-700/50",
  },
];

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

const sampleThreads: ForumThread[] = [
  {
    id: "1",
    title: "How to implement neural networks from scratch?",
    preview:
      "I'm trying to understand the fundamentals of neural networks by building one from scratch using Python. What are the key concepts I should focus on?",
    author: sampleUsers[0],
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
    author: sampleUsers[1],
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
    author: sampleUsers[2],
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
    author: sampleUsers[2],
    tags: [sampleTags[2], sampleTags[0]],
    replies: 6,
    likes: 18,
    createdAt: new Date("2025-06-24"),
    lastActivity: new Date("2025-06-25"),
    isAnswered: true,
  },
];

// Components

const ForumHeader: React.FC<{ onAskQuestion: () => void }> = ({
  onAskQuestion,
}) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-white">Community Forum</h1>
          <button
            onClick={onAskQuestion}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Ask a Question
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterSortControls: React.FC<{
  sortBy: string;
  setSortBy: (sort: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}> = ({ sortBy, setSortBy, selectedTag, setSelectedTag }) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap items-center space-x-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-8 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-600 transition-colors"
              >
                <option value="latest">Latest</option>
                <option value="popular">Most Popular</option>
                <option value="unanswered">Unanswered</option>
                <option value="answered">Answered</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-8 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-600 transition-colors"
              >
                <option value="">All Tags</option>
                {sampleTags.map((tag) => (
                  <option key={tag.id} value={tag.name}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <FiFilter className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Showing {sampleThreads.length} discussions
          </div>
        </div>
      </div>
    </div>
  );
};

const ThreadCard: React.FC<{
  thread: ForumThread;
  onClick: (thread: ForumThread) => void;
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
      className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-600/50 transition-all duration-200 cursor-pointer group"
      onClick={() => onClick(thread)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
          {thread.title}
        </h3>
        {thread.isAnswered && (
          <span className="ml-3 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-900/30 text-green-400 border border-green-700/50 shrink-0">
            Answered
          </span>
        )}
      </div>

      <p className="text-gray-300 text-sm line-clamp-2 mb-4">
        {thread.preview}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {thread.tags.map((tag) => (
          <span
            key={tag.id}
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${tag.color}`}
          >
            <FiTag className="w-3 h-3 mr-1" />
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

        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center hover:text-purple-400 transition-colors">
            <FiMessageSquare className="w-4 h-4 mr-1" />
            {thread.replies}
          </div>
          <div className="flex items-center hover:text-purple-400 transition-colors">
            <FiHeart className="w-4 h-4 mr-1" />
            {thread.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

const ThreadDetail: React.FC<{
  thread: ForumThread;
  onBack: () => void;
}> = ({ thread, onBack }) => {
  const [newReply, setNewReply] = useState("");
  const [replies] = useState<Reply[]>([
    {
      id: "1",
      content:
        "Great question! I'd recommend starting with understanding the mathematical foundations first. Linear algebra and calculus are crucial for grasping how neural networks work.",
      author: sampleUsers[1],
      createdAt: new Date("2025-06-25"),
      likes: 5,
      isLiked: false,
    },
    {
      id: "2",
      content:
        "I agree with Bob. Also, implement a simple perceptron first before moving to multi-layer networks. It helps build intuition.",
      author: sampleUsers[2],
      createdAt: new Date("2025-06-26"),
      likes: 3,
      isLiked: true,
    },
  ]);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReply.trim()) {
      // Handle reply submission
      setNewReply("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={onBack}
        className="inline-flex items-center text-purple-400 hover:text-indigo-400 transition-colors mb-6"
      >
        <FiChevronLeft className="w-4 h-4 mr-1" />
        Back to Forum
      </button>

      {/* Original Post */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{thread.title}</h1>
          {thread.isAnswered && (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-900/30 text-green-400 border border-green-700/50">
              Answered
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {thread.tags.map((tag) => (
            <span
              key={tag.id}
              className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${tag.color}`}
            >
              <FiTag className="w-3 h-3 mr-1" />
              {tag.name}
            </span>
          ))}
        </div>

        <p className="text-gray-200 mb-6 leading-relaxed">{thread.preview}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={thread.author.avatar}
              alt={thread.author.name}
              className="w-8 h-8 rounded-full ring-2 ring-purple-500/20"
            />
            <div>
              <p className="text-sm font-medium text-white">
                {thread.author.name}
              </p>
              <p className="text-xs text-gray-400">Posted 2 days ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
              <FiHeart className="w-4 h-4 mr-1" />
              {thread.likes}
            </button>
            <button className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
              <FiArrowUp className="w-4 h-4 mr-1" />
              Upvote
            </button>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-white">
          {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h2>

        {replies.map((reply, index) => (
          <div
            key={reply.id}
            className={`rounded-lg p-6 border ${
              index % 2 === 0
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-750 border-gray-600"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={reply.author.avatar}
                  alt={reply.author.name}
                  className="w-8 h-8 rounded-full ring-2 ring-purple-500/20"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {reply.author.name}
                  </p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>

              <button
                className={`flex items-center text-sm transition-colors ${
                  reply.isLiked
                    ? "text-red-400"
                    : "text-gray-400 hover:text-red-400"
                }`}
              >
                <FiHeart
                  className={`w-4 h-4 mr-1 ${
                    reply.isLiked ? "fill-current" : ""
                  }`}
                />
                {reply.likes}
              </button>
            </div>

            <p className="text-gray-200 leading-relaxed">{reply.content}</p>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add a Reply</h3>
        <form onSubmit={handleSubmitReply}>
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts, insights, or ask follow-up questions..."
            className="w-full p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
            rows={4}
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-400">
              You can use markdown formatting in your reply
            </p>
            <button
              type="submit"
              disabled={!newReply.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
            >
              Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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
        className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-purple-400 hover:bg-gray-700 hover:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              : "border border-gray-700 bg-gray-800 text-purple-400 hover:bg-gray-700 hover:border-purple-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-purple-400 hover:bg-gray-700 hover:border-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Main Forum Component
const EurekaForumPage: React.FC = () => {
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(
    null
  );
  const [sortBy, setSortBy] = useState("latest");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const threadsPerPage = 10;
  const totalPages = Math.ceil(sampleThreads.length / threadsPerPage);

  const filteredThreads = sampleThreads.filter((thread) => {
    if (selectedTag && !thread.tags.some((tag) => tag.name === selectedTag)) {
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
      <div className="min-h-screen bg-gray-900">
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
    <div className="min-h-screen bg-gray-900">
      <div className="pt-16">
        <ForumHeader onAskQuestion={() => setShowQuestionModal(true)} />

        <FilterSortControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <FiMessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No discussions found
              </h3>
              <p className="text-gray-400">
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

export default EurekaForumPage;
