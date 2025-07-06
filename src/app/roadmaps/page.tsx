"use client";
import React, { useState } from "react";
import {
  FaArrowRight,
  FaBookOpen,
  FaBrain,
  FaCheckCircle,
  FaChevronDown,
  FaCircle,
  FaClock,
  FaCode,
  FaDatabase,
  FaPhone,
  FaPlay,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

interface Roadmap {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  steps: RoadmapStep[];
  enrolled: number;
}

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed";
  resources?: string[];
}

const EurekaRoadmapPage: React.FC = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Course Category");
  const [selectedLevel, setSelectedLevel] = useState("Difficulty");

  const roadmaps: Roadmap[] = [
    {
      id: "web-dev",
      title: "Web Development",
      level: "Beginner",
      duration: "3-4 months",
      description:
        "Complete guide to modern web development from HTML to deployment",
      icon: <FaCode className="w-6 h-6 text-black dark:text-indigo-400" />,
      category: "Web Development",
      enrolled: 1247,
      steps: [
        {
          id: "html-css",
          title: "Learn HTML & CSS",
          description: "Master the fundamentals of web structure and styling",
          status: "completed",
          resources: ["MDN Web Docs", "CSS Tricks", "Flexbox Froggy"],
        },
        {
          id: "git-github",
          title: "Understand Git & GitHub",
          description: "Version control and collaboration essentials",
          status: "in-progress",
          resources: ["Git Handbook", "GitHub Learning Lab"],
        },
        {
          id: "javascript",
          title: "Master JavaScript",
          description: "Core programming concepts and modern ES6+ features",
          status: "not-started",
          resources: ["JavaScript.info", "MDN JavaScript Guide"],
        },
        {
          id: "projects",
          title: "Build Mini Projects",
          description: "Apply your skills with hands-on projects",
          status: "not-started",
          resources: ["Project Ideas", "Code Challenges"],
        },
        {
          id: "react",
          title: "Learn React or Next.js",
          description: "Modern frontend frameworks and libraries",
          status: "not-started",
          resources: ["React Documentation", "Next.js Tutorial"],
        },
        {
          id: "deployment",
          title: "Host on GitHub Pages / Vercel",
          description: "Deploy your projects to the web",
          status: "not-started",
          resources: ["Vercel Docs", "GitHub Pages Guide"],
        },
      ],
    },
    {
      id: "dsa",
      title: "Data Structures & Algorithms",
      level: "Intermediate",
      duration: "4-6 months",
      description:
        "Master problem-solving with efficient algorithms and data structures",
      icon: <FaBrain className="w-6 h-6 text-black dark:text-indigo-400" />,
      category: "Computer Science",
      enrolled: 892,
      steps: [
        {
          id: "arrays",
          title: "Arrays & Strings",
          description: "Fundamental data structures and operations",
          status: "completed",
        },
        {
          id: "linked-lists",
          title: "Linked Lists",
          description: "Dynamic data structures and pointer manipulation",
          status: "in-progress",
        },
        {
          id: "stacks-queues",
          title: "Stacks & Queues",
          description: "LIFO and FIFO data structures",
          status: "not-started",
        },
        {
          id: "trees",
          title: "Trees & Graphs",
          description: "Hierarchical and network data structures",
          status: "not-started",
        },
        {
          id: "algorithms",
          title: "Sorting & Searching",
          description: "Efficient algorithms for common operations",
          status: "not-started",
        },
        {
          id: "dynamic-programming",
          title: "Dynamic Programming",
          description: "Optimization technique for complex problems",
          status: "not-started",
        },
      ],
    },
    {
      id: "python-ml",
      title: "Python for Machine Learning",
      level: "Advanced",
      duration: "5-7 months",
      description:
        "Complete ML pipeline from data preprocessing to model deployment",
      icon: <FaDatabase className="w-6 h-6 text-black dark:text-indigo-400" />,
      category: "Machine Learning",
      enrolled: 634,
      steps: [
        {
          id: "python-basics",
          title: "Python Fundamentals",
          description: "Core Python programming concepts",
          status: "completed",
        },
        {
          id: "numpy-pandas",
          title: "NumPy & Pandas",
          description: "Data manipulation and analysis libraries",
          status: "in-progress",
        },
        {
          id: "visualization",
          title: "Data Visualization",
          description: "Creating insights with Matplotlib and Seaborn",
          status: "not-started",
        },
        {
          id: "ml-algorithms",
          title: "ML Algorithms",
          description: "Supervised and unsupervised learning techniques",
          status: "not-started",
        },
        {
          id: "deep-learning",
          title: "Deep Learning",
          description: "Neural networks with TensorFlow/PyTorch",
          status: "not-started",
        },
        {
          id: "deployment",
          title: "Model Deployment",
          description: "Deploy ML models to production",
          status: "not-started",
        },
      ],
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      level: "Intermediate",
      duration: "4-5 months",
      description: "Build cross-platform mobile apps with React Native",
      icon: <FaPhone className="w-6 h-6 text-black dark:text-indigo-400" />,
      category: "Mobile Development",
      enrolled: 453,
      steps: [
        {
          id: "react-native-basics",
          title: "React Native Fundamentals",
          description: "Core concepts and component development",
          status: "not-started",
        },
        {
          id: "navigation",
          title: "Navigation & Routing",
          description: "Screen navigation and app flow",
          status: "not-started",
        },
        {
          id: "state-management",
          title: "State Management",
          description: "Managing app state with Redux/Context",
          status: "not-started",
        },
        {
          id: "native-features",
          title: "Native Features",
          description: "Camera, GPS, notifications, and device APIs",
          status: "not-started",
        },
        {
          id: "testing",
          title: "Testing & Debugging",
          description: "Unit testing and debugging techniques",
          status: "not-started",
        },
        {
          id: "deployment",
          title: "App Store Deployment",
          description: "Publishing to Google Play and App Store",
          status: "not-started",
        },
      ],
    },
  ];

  const categories = [
    "Course Category",
    "Web Development",
    "Computer Science",
    "Machine Learning",
    "Mobile Development",
  ];
  const levels = ["Difficulty", "Beginner", "Intermediate", "Advanced"];

  const filteredRoadmaps = roadmaps.filter((roadmap) => {
    const matchesSearch =
      roadmap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Course Category" || roadmap.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "Difficulty" || roadmap.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-900 text-green-200 border border-green-700";
      case "Intermediate":
        return "bg-yellow-900 text-yellow-200 border border-yellow-700";
      case "Advanced":
        return "bg-red-900 text-red-200 border border-red-700";
      default:
        return "bg-gray-700 text-gray-200 border border-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="w-5 h-5 text-green-400" />;
      case "in-progress":
        return <FaPlay className="w-5 h-5 text-indigo-400" />;
      default:
        return <FaCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (selectedRoadmap) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 text-black dark:text-white">
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-hray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg mr-4">
                  {selectedRoadmap.icon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
                    {selectedRoadmap.title}
                  </h1>
                  <p className="text-lg text-black dark:text-gray-400">
                    {selectedRoadmap.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-6 text-sm">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                    selectedRoadmap.level
                  )}`}
                >
                  {selectedRoadmap.level}
                </span>
                <div className="flex items-center space-x-1 text-black dark:text-gray-300">
                  <FaClock className="w-4 h-4" />
                  <span>{selectedRoadmap.duration}</span>
                </div>
                <div className="flex items-center space-x-1 text-black dark:text-gray-300">
                  <FaUsers className="w-4 h-4" />
                  <span>
                    {selectedRoadmap.enrolled.toLocaleString()} enrolled
                  </span>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {selectedRoadmap.steps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="flex items-start space-x-4 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-750 hover:border-gray-600 transition-all duration-200">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(step.status)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-black dark:text-white">
                          {step.title}
                        </h3>
                        <span className="text-sm text-black dark:text-gray-400">
                          Step {index + 1}
                        </span>
                      </div>

                      <p className="text-gray-400 dark:text-gray-300 mb-3">
                        {step.description}
                      </p>

                      {step.resources && (
                        <div className="flex flex-wrap gap-2">
                          {step.resources.map((resource, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-indigo-400 dark:bg-indigo-900 text-white dark:text-indigo-200 b rounded"
                            >
                              {resource}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
                      {step.status === "completed"
                        ? "Review"
                        : step.status === "in-progress"
                        ? "Continue"
                        : "Start"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setSelectedRoadmap(null)}
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                ← Back to Roadmaps
              </button>
              <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium">
                Add to My Learning
              </button>
              <button className="px-8 py-3 border border-indigo-600 text-indigo-400 hover:bg-indigo-900 hover:border-indigo-500 rounded-lg transition-colors duration-200 font-medium">
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 text-white dark:text-white">
      {/* Main Content */}
      <div className="pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search roadmaps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border appearance-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white "
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-white dark:bg-gray-800 text-black dark:text-white"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border appearance-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-black dark:text-white"
                  >
                    {levels.map((level) => (
                      <option
                        key={level}
                        value={level}
                        className="bg-white dark:bg-gray-800 text-black dark:text-white"
                      >
                        {level}
                      </option>
                    ))}
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filteredRoadmaps.map((roadmap) => (
              <div
                key={roadmap.id}
                className="group cursor-pointer transition-all duration-300 bg-white dark:bg-gray-800 hover:bg-gray-750 border border-gray-300  dark:border-gray-700 hover:border-indigo-600 rounded-lg p-6 hover:scale-105"
                onClick={() => setSelectedRoadmap(roadmap)}
              >
                <div className="flex items-center mb-4 ">
                  <div className="p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mr-4  transition-colors duration-200">
                    {roadmap.icon}
                  </div>
                  <div className="flex-1 ">
                    <h3 className="text-lg font-semibold mb-1 text-black dark:text-white">
                      {roadmap.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        roadmap.level
                      )}`}
                    >
                      {roadmap.level}
                    </span>
                  </div>
                </div>

                <p className="text-black dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {roadmap.description}
                </p>

                <div className="flex items-center justify-between text-sm text-black dark:text-gray-300 mb-4">
                  <div className="flex items-center space-x-1">
                    <FaClock className="w-4 h-4" />
                    <span>{roadmap.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaUsers className="w-4 h-4" />
                    <span>{roadmap.enrolled}</span>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2">
                  <span>Start Learning</span>
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {filteredRoadmaps.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FaBookOpen className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No roadmaps found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EurekaRoadmapPage;
