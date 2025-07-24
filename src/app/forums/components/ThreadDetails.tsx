import React, { useState } from "react";
import { FaArrowUp, FaHeart } from "react-icons/fa";
import { FiChevronLeft, FiTag, FiHeart, FiArrowUp } from "react-icons/fi";

const ThreadDetail: React.FC<{
  thread: any; //ForumThread[];
  onBack: () => void;
}> = ({ thread, onBack }) => {
  const [newReply, setNewReply] = useState("");
  const [isThreadLiked, setIsThreadLiked] = useState(false);
  const [isThreadUpvoted, setIsThreadUpvoted] = useState(false);
  const [replies] = useState<any[]>([
    // reply
    {
      id: "1",
      content:
        "Great question! I'd recommend starting with understanding the mathematical foundations first. Linear algebra and calculus are crucial for grasping how neural networks work.",
      author: "sampleUsers",
      createdAt: new Date("2025-06-25"),
      likes: 5,
      isLiked: false,
    },
    {
      id: "2",
      content:
        "I agree with Bob. Also, implement a simple perceptron first before moving to multi-layer networks. It helps build intuition.",
      author: "sampleUsers[2]",
      createdAt: new Date("2025-06-26"),
      likes: 3,
      isLiked: true,
    },
  ]);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReply.trim()) {
      setNewReply("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-black pt-14">
      <button
        onClick={onBack}
        className="inline-flex items-center text-purple-400 hover:text-indigo-400 transition-colors mb-6"
      >
        <FiChevronLeft className="w-4 h-4 mr-1 " />
        Back to Forum
      </button>

      <div className="bg-white text-black dark:text-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200  dark:border-gray-700 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            {thread.title}
          </h1>
          {thread.isAnswered && (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-200/2 text-green-400 dark:bg-green-900/30  dark:text-green-400 border dark:border-green-700/50">
              Answered
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4 text-black dark:text-white ">
          {thread.tags.map((tag: any) => (
            <span
              key={tag.id}
              className={`text-white/80 dark:text-gray-200 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-600 dark:bg-gray-700`}
            >
              <FiTag className="w-3 h-3 mr-1 text-white dark:text-black" />
              {tag.name}
            </span>
          ))}
        </div>

        <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
          {thread.preview}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200  dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={thread.author.avatar}
              alt={thread.author.name}
              className="w-8 h-8 rounded-full ring-2 ring-purple-500/20"
            />
            <div>
              <p className="text-sm font-medium text-black dark:text-white">
                {thread.author.name || "Anonymous"}
              </p>
              <p
                className="text-xs text-gray-900 
              dark:text-gray-400"
              >
                Posted (thread.uptime) days ago
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center text-gray-800 dark:text-gray-400  transition-colors"
              onClick={() => setIsThreadLiked(!isThreadLiked)}
            >
              {isThreadLiked ? (
                <FaHeart className="w-5 h-5 mr-1 text-red-500 fill-red-500 transition-all duration-300 transform scale-110" />
              ) : (
                <FaHeart className="w-5 h-5 mr-1 text-gray-400 transition-all duration-300 hover:scale-105" />
              )}
              <span>{thread.likes}</span>
            </button>
            <button
              onClick={() => setIsThreadUpvoted(!isThreadUpvoted)}
              className="flex items-center text-gray-800 dark:text-gray-400 transition-colors"
            >
              {isThreadUpvoted ? (
                <FaArrowUp className="w-6 h-6 mr-1 text-green-500 fill-green-500 transition-all duration-600 transform scale-110 " />
              ) : (
                <FaArrowUp className="w-6 h-6 mr-1 text-gray-400 transition-all duration-300 hover:scale-105" />
              )}
              <span className={`${isThreadUpvoted ? "text-green-500" : ""}`}>
                {isThreadUpvoted ? "Upvoted" : "Upvote"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-black dark:text-white  ">
          {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h2>

        {replies.map((reply, index) => (
          <div
            key={reply.id}
            className={`rounded-lg p-6 border text-black dark:text-white ${
              index % 2 === 0
                ? "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-600"
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
                  <p className="text-sm font-medium text-black dark:text-white">
                    {reply.author.name || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-900    dark:text-gray-400">
                    (reply.createdAt) day ago
                  </p>
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

            <p className="text-gray-900 dark:text-gray-200 leading-relaxed">
              {reply.content}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white  dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
          Add a Reply
        </h3>
        <form onSubmit={handleSubmitReply}>
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts, insights, or ask follow-up questions..."
            className="w-full p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-black
            dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 resize-none"
            rows={4}
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-900 dark:text-gray-300">
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

export default ThreadDetail;
