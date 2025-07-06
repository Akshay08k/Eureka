"use client";
import React, { useState } from "react";
import {
  FiUpload,
  FiDownload,
  FiEye,
  FiFilter,
  FiChevronDown,
  FiFileText,
  FiFile,
  FiImage,
} from "react-icons/fi";
import { AiFillFilePdf, AiFillFileWord, AiFillFilePpt } from "react-icons/ai";
import FileUpload from "../components/UploadFile";

interface Resource {
  id: string;
  title: string;
  type: "PDF" | "DOC" | "PPT" | "TXT" | "IMG";
  subject: string;
  uploaderName: string;
  dateUploaded: string;
  downloadUrl: string;
}

const ResourcesPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedFileType, setSelectedFileType] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Mock data
  const resources: Resource[] = [
    {
      id: "1",
      title: "Introduction to Machine Learning",
      type: "PDF",
      subject: "Computer Science",
      uploaderName: "Dr. Sarah Chen",
      dateUploaded: "2024-06-20",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Calculus II Study Guide",
      type: "DOC",
      subject: "Mathematics",
      uploaderName: "Prof. Michael Johnson",
      dateUploaded: "2024-06-18",
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Organic Chemistry Presentation",
      type: "PPT",
      subject: "Chemistry",
      uploaderName: "Dr. Emily Rodriguez",
      dateUploaded: "2024-06-15",
      downloadUrl: "#",
    },
    {
      id: "4",
      title: "Physics Lab Report Template",
      type: "DOC",
      subject: "Physics",
      uploaderName: "Prof. David Kim",
      dateUploaded: "2024-06-12",
      downloadUrl: "#",
    },
    {
      id: "5",
      title: "Data Structures Cheat Sheet",
      type: "PDF",
      subject: "Computer Science",
      uploaderName: "Alex Thompson",
      dateUploaded: "2024-06-10",
      downloadUrl: "#",
    },
    {
      id: "6",
      title: "History Essay Guidelines",
      type: "TXT",
      subject: "History",
      uploaderName: "Prof. Lisa Wang",
      dateUploaded: "2024-06-08",
      downloadUrl: "#",
    },
  ];

  const subjects = [
    "all",
    "Computer Science",
    "Mathematics",
    "Chemistry",
    "Physics",
    "History",
  ];
  const fileTypes = ["all", "PDF", "DOC", "PPT", "TXT", "IMG"];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <AiFillFilePdf className="text-red-400 text-xl" />;
      case "DOC":
        return <AiFillFileWord className="text-blue-400 text-xl" />;
      case "PPT":
        return <AiFillFilePpt className="text-orange-400 text-xl" />;
      case "TXT":
        return <FiFileText className="text-gray-400 text-xl" />;
      case "IMG":
        return <FiImage className="text-green-400 text-xl" />;
      default:
        return <FiFile className="text-gray-400 text-xl" />;
    }
  };

  const filteredResources = resources
    .filter(
      (resource) =>
        selectedSubject === "all" || resource.subject === selectedSubject
    )
    .filter(
      (resource) =>
        selectedFileType === "all" || resource.type === selectedFileType
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return (
          new Date(b.dateUploaded).getTime() -
          new Date(a.dateUploaded).getTime()
        );
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <FileUpload isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                Resources Center
              </h1>
              <p className="text-gray-400">
                Access, upload, and explore shared academic materials
              </p>
            </div>
            <button
              onClick={() => setIsPopupOpen(true)}
              className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <FiUpload className="text-sm" />
              <span>Upload Resource</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="mb-6">
            {/* Mobile Filter Toggle */}
            <button
              className="md:hidden mb-4 flex items-center space-x-2 text-gray-900 dark:text-gray-300 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="text-sm" />
              <span>Filters</span>
              <FiChevronDown
                className={`text-sm transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Filter Controls */}
            <div className={`${showFilters ? "block" : "hidden"} md:block`}>
              <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className=" rounded-sm hover:outline hover:outline-gray-500 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 bg-gray-300 dark:bg-gray-800 text-gray-900dark:text-gray-200"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === "all" ? "All Subjects" : subject}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedFileType}
                  onChange={(e) => setSelectedFileType(e.target.value)}
                  className=" rounded-sm px-3 py-2 text-sm hover:outline hover:outline-gray-500  focus:border-indigo-500 bg-gray-300 dark:bg-gray-800 text-gray-900dark:text-gray-200"
                >
                  {fileTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "all" ? "All File Types" : type}
                    </option>
                  ))}
                </select>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="hover:outline hover:outline-gray-500 rounded-sm px-3 py-2 text-sm  bg-gray-300 dark:bg-gray-800 text-gray-900dark:text-gray-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="alphabetical">A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-lg dark:hover:border-indigo-500/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getFileIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
                        {resource.title}
                      </h3>
                      <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="bg-gray-100 dark:bg-indigo-900/30 text-gray-700 dark:text-indigo-300 px-2 py-1 rounded-md font-medium text-xs inline-block w-fit">
                          {resource.subject}
                        </span>
                        <span>by {resource.uploaderName}</span>
                        <span>
                          {new Date(resource.dateUploaded).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <button className="flex items-center space-x-1 bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-gray-200 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center">
                      <FiEye className="text-sm" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-lg hover:shadow-indigo-500/25 flex-1 justify-center">
                      <FiDownload className="text-sm" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                <FiFileText className="mx-auto text-4xl" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No resources found
              </h3>
              <p className="text-gray-400">
                Try adjusting your filters or upload a new resource.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
