"use client";
import React, { useState, useRef, KeyboardEvent } from "react";
import {
  IoClose,
  IoCheckmarkCircle,
  IoHelpCircleOutline,
  IoAdd,
  IoCloseOutline,
  IoSparklesOutline,
} from "react-icons/io5";

interface ForumQuestionProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PostData {
  title: string;
  description: string;
  tags: string[];
  aiTagging: boolean;
}

const ForumQuestion: React.FC<ForumQuestionProps> = ({ isOpen, onClose }) => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    tags: [],
    aiTagging: false,
  });

  const [currentTag, setCurrentTag] = useState<string>("");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [postComplete, setPostComplete] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const tagInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof PostData,
    value: string | boolean
  ): void => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addTag = (): void => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !postData.tags.includes(tag) && postData.tags.length < 5) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string): void => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const isFormValid = (): boolean => {
    return (
      postData.title.trim().length > 0 && postData.description.trim().length > 0
    );
  };

  const handlePost = async (): Promise<void> => {
    if (!isFormValid()) return;

    setIsPosting(true);

    // Simulate posting process
    setTimeout(() => {
      setPostComplete(true);
      setIsPosting(false);
    }, 2000);
  };

  const handleClose = (): void => {
    setPostData({
      title: "",
      description: "",
      tags: [],
      aiTagging: false,
    });
    setCurrentTag("");
    setIsPosting(false);
    setPostComplete(false);
    setShowTooltip(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur flex items-center justify-center z-50 p-5 overflow-y-auto">
      <div className="bg-[#F8FAFC] dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-600 max-w-2xl w-full p-8 relative animate-in fade-in slide-in-from-bottom-4 duration-300 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-black dark:text-gray-400 hover:text-gray-200 hover:bg-gray-700 p-2 rounded-lg transition-all duration-200"
        >
          <IoClose size={24} />
        </button>

        {!postComplete ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black dark:text-[#5B5F97] mb-2">
                Ask a Question
              </h2>
              <p className=" text-gray-600 dark:text-gray-400">
                Share your question with the Eureka community
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-semibold text-black dark:text-gray-300 mb-2">
                  Question Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={postData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="What's your question about?"
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl text-black dark:text-gray-200 placeholder-gray-500 transition-all duration-200"
                  maxLength={150}
                />
                <div className="text-right mt-1">
                  <span
                    className={`text-xs text-gray-500 ${
                      postData.title.length > 140 ? "text-red-500" : ""
                    }`}
                  >
                    {postData.title.length}/150
                  </span>
                </div>
              </div>
              {/* Description Textarea */}
              <div>
                <label className="block text-sm font-semibold text-black dark:text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={postData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Provide more details about your question..."
                  rows={6}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-black dark:text-gray-200 placeholder-gray-500 transition-all duration-200 resize-none"
                  maxLength={1000}
                />
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-500">
                    {postData.description.length}/1000
                  </span>
                </div>
              </div>
              {/* Tags Section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-sm font-semibold text-black dark:text-gray-300">
                    Tags
                  </label>
                  <span className="text-xs text-black dark:text-gray-500 bg-gray-400 dark:bg-gray-700 px-2 py-1 rounded">
                    Max 5 tags
                  </span>
                </div>

                {postData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {postData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-[#6C63FF] text-white px-3 py-1 rounded-sm text-sm font-medium"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:bg-black dark:hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-all duration-200"
                        >
                          <IoCloseOutline size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Tag Input */}
                {postData.tags.length < 5 && (
                  <div className="flex gap-2">
                    <input
                      ref={tagInputRef}
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder="Add a tag..."
                      className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg text-black dark:text-gray-200 placeholder-gray-500 transition-all duration-200"
                      maxLength={20}
                    />
                    <button
                      onClick={addTag}
                      disabled={
                        !currentTag.trim() ||
                        postData.tags.includes(currentTag.trim().toLowerCase())
                      }
                      className="px-4 py-2 bg-[#6C63FF] text-white rounded-lg hover:bg-[#5B5F97] disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
                    >
                      <IoAdd size={16} />
                      Add
                    </button>
                  </div>
                )}
              </div>
              {/* AI Tagging Option */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="aiTagging"
                      checked={postData.aiTagging}
                      onChange={(e) =>
                        handleInputChange("aiTagging", e.target.checked)
                      }
                      className="w-4 h-4 text-black dark:text-[#6C63FF] bg-gray-700 border-gray-600 rounded"
                    />
                  </div>

                  <div className="flex items-center gap-2 flex-1">
                    <IoSparklesOutline
                      size={20}
                      className="dark:text-[#6C63FF]"
                    />
                    <label
                      htmlFor="aiTagging"
                      className="text-sm font-medium text-black dark:text-gray-200 cursor-pointer"
                    >
                      AI Tag Generation
                    </label>

                    <div className="relative">
                      <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="text-black dark:text-gray-400 hover:text-gray-300 transition-colors duration-200"
                      >
                        <IoHelpCircleOutline size={16} />
                      </button>

                      {showTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg border border-gray-600 whitespace-nowrap z-10">
                          AI will automatically generate relevant tags from your
                          question
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {postData.aiTagging && (
                  <p className="text-xs text-blackdark:text-gray-400 mt-2 ml-7">
                    Tags will be automatically generated based on your question
                    content
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-8">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={!isFormValid() || isPosting}
                className="px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-semibold hover:bg-[#5B5F97] hover:-translate-y-0.5 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center gap-2"
              >
                {isPosting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  "Post Question"
                )}
              </button>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#10B981] rounded-full flex items-center justify-center">
              <IoCheckmarkCircle size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-gray-200 mb-3">
              Question Posted!
            </h3>
            <p className=" text-black dark:text-gray-400 mb-8 max-w-md mx-auto">
              Your question has been posted to the forum. The community will
              help you find answers.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200"
              >
                Close
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-[#6C63FF] text-white rounded-lg font-semibold hover:bg-[#5B5F97] hover:-translate-y-0.5 transition-all duration-200"
              >
                View Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumQuestion;
