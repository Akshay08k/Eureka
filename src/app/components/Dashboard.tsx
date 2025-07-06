"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  FiMessageSquare,
  FiFileText,
  FiCalendar,
  FiBell,
  FiClock,
  FiPlus,
  FiDownload,
  FiPlay,
  FiFile,
  FiEdit3,
  FiBookmark,
  FiSearch,
} from "react-icons/fi";
import {
  FaGraduationCap,
  FaChartLine,
  FaQuestionCircle,
  FaStickyNote,
} from "react-icons/fa";

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long" as const,
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
    };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const forumActivity = [
    {
      id: 1,
      title: "Help with calculus derivatives",
      author: "Sarah Chen",
      time: "2 hours ago",
      replies: 5,
      category: "Mathematics",
      isUnanswered: true,
    },
    {
      id: 2,
      title: "Python programming best practices",
      author: "Mike Johnson",
      time: "4 hours ago",
      replies: 12,
      category: "Computer Science",
      isUnanswered: false,
    },
    {
      id: 3,
      title: "Study group for Physics midterm",
      author: "Emma Davis",
      time: "6 hours ago",
      replies: 8,
      category: "Physics",
      isUnanswered: false,
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Linear Algebra Cheat Sheet",
      type: "PDF",
      uploadedBy: "Dr. Smith",
      time: "1 day ago",
      icon: FiFile,
      downloads: 234,
    },
    {
      id: 2,
      title: "JavaScript ES6 Tutorial",
      type: "Video",
      uploadedBy: "Prof. Wilson",
      time: "2 days ago",
      icon: FiPlay,
      downloads: 156,
    },
    {
      id: 3,
      title: "Chemistry Lab Manual",
      type: "PDF",
      uploadedBy: "Dr. Brown",
      time: "3 days ago",
      icon: FiFileText,
      downloads: 89,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "CS101 Midterm Exam",
      date: "Tomorrow",
      time: "9:00 AM",
      type: "exam",
    },
    {
      id: 2,
      title: "Math Study Group",
      date: "Thursday",
      time: "4:00 PM",
      type: "study",
    },
    {
      id: 3,
      title: "Physics Assignment Due",
      date: "Friday",
      time: "11:59 PM",
      type: "assignment",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "New reply to your forum post",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      message: "Assignment graded: CS101 Project",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "New resource shared in Math group",
      time: "3 hours ago",
      read: true,
    },
  ];

  const myNotes = [
    {
      id: 1,
      title: "Calculus Integration Methods",
      subject: "Mathematics",
      lastEdited: "2 hours ago",
      preview:
        "Integration by parts, substitution method, trigonometric integrals...",
      isPinned: true,
    },
    {
      id: 2,
      title: "Python Data Structures",
      subject: "Computer Science",
      lastEdited: "1 day ago",
      preview:
        "Lists, dictionaries, sets, tuples - key operations and use cases...",
      isPinned: false,
    },
    {
      id: 3,
      title: "Physics Formulas - Mechanics",
      subject: "Physics",
      lastEdited: "3 days ago",
      preview: "Newton's laws, kinematic equations, work-energy theorem...",
      isPinned: true,
    },
    {
      id: 4,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry",
      lastEdited: "5 days ago",
      preview: "SN1, SN2, elimination reactions, mechanism steps...",
      isPinned: false,
    },
  ];

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900 min-h-screen pt-26 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="">
                  <Image
                    src={session?.user?.image || "/avatar.png"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-indigo-500/20"
                  />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {session?.user?.name || "User(Not Logged In)"}{" "}
                    👋
                  </h1>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700">
                      <FaGraduationCap className="mr-1" />
                      Student
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Ready to learn today?
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Today
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {currentDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <FaChartLine className="mr-2" />
                Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">
                    Courses Completed
                  </span>
                  <span className="font-bold text-white">8/12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">
                    Forum Contributions
                  </span>
                  <span className="font-bold text-white">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">
                    Resources Downloaded
                  </span>
                  <span className="font-bold text-white">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">
                    Resource Contributed
                  </span>
                  <span className="font-bold text-white">0</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiPlus className="text-indigo-600 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center">
                  <FaQuestionCircle className="mr-2" />
                  Ask Question
                </button>
                <button className="w-full bg-indigo-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center">
                  <FaStickyNote className="mr-2" />
                  New Note
                </button>
                <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center border border-gray-300 dark:border-gray-600">
                  <FiSearch className="mr-2" />
                  Browse Resources
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                  <FiBell className="text-indigo-600 mr-2" />
                  Notifications
                </h3>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-bold px-2 py-1 rounded-full">
                  {notifications.filter((n) => !n.read).length}
                </span>
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.read
                        ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        : "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-700"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        notification.read
                          ? "text-gray-600 dark:text-gray-400"
                          : "text-gray-900 dark:text-gray-100 font-medium"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Forum Activity & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <FiMessageSquare className="text-indigo-600 mr-3" />
                Recent Forum Activity
              </h2>
              <button className="bg-indigo-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center shadow-lg">
                <FaQuestionCircle className="mr-2" />
                Ask Question
              </button>
            </div>

            <div className="space-y-4">
              {forumActivity.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 transition-colors">
                          {post.title}
                        </h4>
                        {post.isUnanswered && (
                          <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs px-2 py-1 rounded-full">
                            Unanswered
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>by {post.author}</span>
                        <span>{post.time}</span>
                        <span className="flex items-center">
                          <FiMessageSquare className="mr-1" />
                          {post.replies} replies
                        </span>
                      </div>
                    </div>
                    <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Resources */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <FiFileText className="text-indigo-600 mr-3" />
                Recommended Resources
              </h2>
              <button className="text-indigo-600 hover:text-purple-700 transition-colors text-sm font-medium">
                Browse All
              </button>
            </div>

            <div className="space-y-4">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 transition-colors cursor-pointer group bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                      <resource.icon className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">
                        {resource.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>by {resource.uploadedBy}</span>
                        <span>{resource.time}</span>
                        <span className="flex items-center">
                          <FiDownload className="mr-1" />
                          {resource.downloads}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                    {resource.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FiCalendar className="text-indigo-600 mr-3" />
              Upcoming Events
            </h2>
            <button className="text-indigo-600 hover:text-purple-700 transition-colors text-sm font-medium">
              View Calendar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-indigo-500 transition-colors bg-gray-50 dark:bg-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  <FiClock className="text-gray-500 dark:text-gray-400" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {event.title}
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Notes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              <FaStickyNote className="text-indigo-600 mr-3" />
              My Notes
            </h2>
            <div className="flex items-center space-x-3">
              <button className="text-indigo-600 hover:text-purple-700 transition-colors text-sm font-medium">
                View All
              </button>
              <button className="bg-indigo-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center shadow-lg">
                <FiPlus className="mr-2" />
                New Note
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {myNotes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:scale-105 transition-all duration-200 cursor-pointer relative group"
              >
                {note.isPinned && (
                  <div className="absolute top-2 right-2">
                    <FiBookmark className="text-yellow-500 fill-current" />
                  </div>
                )}
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 pr-6">
                    {note.title}
                  </h4>
                  <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                    {note.subject}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                  {note.preview}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <FiClock className="mr-1" />
                    {note.lastEdited}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-indigo-600">
                    <FiEdit3 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <FiPlus />
              <span>Create New Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
