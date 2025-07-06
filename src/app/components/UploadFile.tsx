"use client";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  IoCloudUploadOutline,
  IoClose,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoTrashOutline,
} from "react-icons/io5";

interface FileUploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadedFile {
  file: File;
  name: string;
  size: string;
}

const FileUpload: React.FC<FileUploadPopupProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a valid file type (PDF, DOC, PPT, or Image)");
      return false;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert("File size must be less than 50MB");
      return false;
    }

    return true;
  };

  const handleFile = (file: File): void => {
    if (validateFile(file)) {
      setSelectedFile({
        file,
        name: file.name,
        size: formatFileSize(file.size),
      });
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const removeFile = (): void => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (): Promise<void> => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadComplete(true);
            setIsUploading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleClose = (): void => {
    setSelectedFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadComplete(false);
    setIsDragOver(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClose();
  };

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-5">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 max-w-2xl w-full p-8  relative animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-black dark:text-gray-400 hover:text-gray-200 hover:bg-gray-700 p-2 rounded-lg transition-all duration-200"
        >
          <IoClose size={24} />
        </button>

        {!uploadComplete ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-black dark:text-[#5B5F97] mb-2">
                Upload Resource
              </h2>
              <p className="text-black dark:text-gray-400">
                Share your learning materials with the community
              </p>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer mb-6 relative overflow-hidden bg-white dark:bg-gray-900  ${
                isDragOver
                  ? "border-[#9c98e1] dark:border-[#6C63FF] bg-indigo-400 dark:bg-indigo-950"
                  : "border-gray-500 dark:border-gray-600 hover:border-[#6C63FF] hover:bg-gray-400 dark:hover:bg-indigo-950 hover:-translate-y-0.5"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6C63FF] to-purple-600 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  isDragOver ? "scale-110" : "hover:scale-110"
                }`}
              >
                <IoCloudUploadOutline size={32} className="text-white" />
              </div>

              <p className="text-lg font-semibold text-black  dark:text-gray-200 mb-2">
                Drop your file here or click to browse
              </p>
              <p className="text-blackdark:text-gray-400 text-sm mb-4">
                Maximum file size: 50MB
              </p>

              <div className="flex justify-center gap-3 flex-wrap">
                {["PDF", "DOC", "PPT", "IMG"].map((type) => (
                  <span
                    key={type}
                    className="bg-white dark:bg-gray-700 text-black dark:text-[#6C63FF] px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider outline outline-black"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.svg"
              onChange={handleFileSelect}
            />

            {selectedFile && (
              <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6 flex items-center gap-3">
                <IoDocumentTextOutline size={24} className="text-[#6C63FF]" />
                <div className="flex-1">
                  <div className="font-semibold text-black dark:text-gray-200">
                    {selectedFile.name}
                  </div>
                  <div className="text-blackdark:text-gray-400 text-sm">
                    {selectedFile.size}
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900 p-2 rounded-md transition-all duration-200"
                >
                  <IoTrashOutline size={20} />
                </button>
              </div>
            )}

            {isUploading && (
              <div className="mb-6">
                <div className="w-full bg-gray-700 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-[#6C63FF] dark:to-[#1a946c] rounded-full transition-all duration-400"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={uploadFile}
                disabled={!selectedFile || isUploading}
                className="px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-semibold hover:bg-[#5B5F97] hover:-translate-y-0.5 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
              >
                {isUploading ? "Uploading..." : "Upload Resource"}
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#10B981] rounded-full flex items-center justify-center">
              <IoCheckmarkCircle size={32} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-gray-200 mb-2">
              Upload Successful!
            </h3>
            <p className="text-black dark:text-gray-400 mb-6">
              Your resource has been shared with the community
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-semibold hover:bg-[#5B5F97] hover:-translate-y-0.5 transition-all duration-200"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Demo Component
export default FileUpload;
