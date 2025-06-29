"use client";
import React from "react";
import { IoClose } from "react-icons/io5";

interface GroupCreationProps {
  isOpen: boolean;
  onClose: () => void;
}

const GroupCreation: React.FC<GroupCreationProps> = ({
  isOpen = true,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-5"
      onClick={onClose}
    >
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600 "
        >
          <IoClose />
        </button>

        <h2 className="text-lg font-semibold mb-4">Group Creation</h2>
        <p className="mb-3">
          Group creation is currently only available for <strong>admins</strong>
          .
        </p>
        <p className="mb-2">
          For users, it is under development. To create a group, please contact
          the admin:
        </p>
        <a
          href="mailto:admineureka@akshaykomale.in"
          className="text-indigo-600 hover:underline"
        >
          admineureka@akshaykomale.in
        </a>
      </div>
    </div>
  );
};

export default GroupCreation;
