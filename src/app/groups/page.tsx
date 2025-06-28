"use client";
import React, { useState } from "react";
import {
  FaSearch,
  FaUsers,
  FaPlus,
  FaTag,
  FaEye,
  FaUserPlus,
} from "react-icons/fa";
interface Group {
  id: string;
  name: string;
  description: string;
  tags: string[];
  memberCount: number;
  isJoined: boolean;
  isPopular?: boolean;
}

interface User {
  name: string;
  avatar: string;
}
const GroupsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const currentUser: User = {
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  };

  const mockGroups: Group[] = [
    {
      id: "1",
      name: "AI Research Lab",
      description:
        "Exploring cutting-edge artificial intelligence research and applications",
      tags: ["AI", "Machine Learning", "Research"],
      memberCount: 45,
      isJoined: true,
      isPopular: true,
    },
    {
      id: "2",
      name: "Web Development Bootcamp",
      description: "Learn modern web development with React, Node.js, and more",
      tags: ["Web Dev", "React", "JavaScript"],
      memberCount: 128,
      isJoined: true,
    },
    {
      id: "3",
      name: "Final Year Projects 2025",
      description: "Collaborate on final year projects and share resources",
      tags: ["Final Year Project", "Collaboration"],
      memberCount: 67,
      isJoined: false,
    },
    {
      id: "4",
      name: "Data Science Collective",
      description:
        "Data analysis, visualization, and statistical modeling discussions",
      tags: ["Data Science", "Python", "Analytics"],
      memberCount: 89,
      isJoined: false,
      isPopular: true,
    },
    {
      id: "5",
      name: "Mobile App Development",
      description: "iOS and Android development best practices and tutorials",
      tags: ["Mobile Dev", "iOS", "Android"],
      memberCount: 34,
      isJoined: true,
    },
    {
      id: "6",
      name: "Cybersecurity Study Group",
      description:
        "Network security, ethical hacking, and cybersecurity certification prep",
      tags: ["Cybersecurity", "Ethical Hacking"],
      memberCount: 56,
      isJoined: false,
    },
  ];

  const filteredGroups = mockGroups
    .filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "joined" && group.isJoined) ||
        (filterBy === "available" && !group.isJoined) ||
        (filterBy === "popular" && group.isPopular);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "members") return b.memberCount - a.memberCount;
      return 0;
    });

  const GroupCard: React.FC<{ group: Group }> = ({ group }) => (
    <div className="group bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">
          {group.name}
        </h3>
        {group.isPopular && (
          <span className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30">
            Popular
          </span>
        )}
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {group.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {group.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 bg-indigo-600/20 text-indigo-300 text-xs px-2 py-1 rounded-md border border-indigo-500/30"
          >
            <FaTag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <FaUsers className="w-4 h-4" />
          <span>{group.memberCount} members</span>
        </div>

        <button
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            group.isJoined
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25"
          }`}
        >
          {group.isJoined ? (
            <>
              <FaEye className="w-4 h-4" />
              View
            </>
          ) : (
            <>
              <FaUserPlus className="w-4 h-4" />
              Join
            </>
          )}
        </button>
      </div>
    </div>
  );

  const EmptyState: React.FC = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-gray-800 rounded-full p-6 mb-6">
        <FaUsers className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">No groups found</h3>
      <p className="text-gray-400 mb-6 max-w-md">
        {searchQuery || filterBy !== "all"
          ? "Try adjusting your search or filters to find groups."
          : "You haven't joined any groups yet. Start by exploring or creating one!"}
      </p>
      <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        <FaPlus className="w-5 h-5" />
        Create Group
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              My Groups & Channels
            </h1>
            <p className="text-gray-400">
              Collaborate, share, and learn together in focused groups.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200">
            <FaPlus className="w-5 h-5" />
            Create Group
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search groups by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
            >
              <option value="all">All Groups</option>
              <option value="joined">Joined</option>
              <option value="available">Available</option>
              <option value="popular">Popular</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="members">Sort by Members</option>
            </select>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
