"use client";
import React, { useState } from "react";
import ProfileOverview from "./components/ProfileOverView";
import SecuritySettings from "./components/SecuritySettings";
import NotificationSettings from "./components/Notifcation";
import SocialLinks from "./components/SocialLinks";
import PersonalDetails from "./components/PersonalDetails";
import Sidebar from "./components/Sidebar";
import { FiMenu } from "react-icons/fi";

const initialUserInfo = {
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  username: "johndoe",
  name: "John Doe",
  email: "john@example.com",
  bio: "Full-stack developer passionate about creating amazing user experiences. Love working with React, Node.js, and modern web technologies.",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  website: "https://johndoe.dev",
  verified: true,
  joinDate: "2022",
};

const initialNotifications = {
  email: true,
  marketing: false,
  security: true,
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileOverview
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        );
      case "personal":
        return (
          <PersonalDetails userInfo={userInfo} setUserInfo={setUserInfo} />
        );
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return (
          <NotificationSettings
            notifications={notifications}
            setNotifications={setNotifications}
          />
        );
      case "social":
        return <SocialLinks />;
      default:
        return (
          <ProfileOverview
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        );
    }
  };

  return (
    <div className="min-h-screen pt-26 dark:bg-gray-900 ">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          closeMobileMenu={closeMobileMenu}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 ">
          <div className="lg:hidden flex items-center justify-between p-4 dark:bg-gray-700  shadow-sm">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiMenu className="w-5 h-5 text-black dark:text-white" />
            </button>
            <h1 className="text-lg font-semibold dark:text-gray-300 text-black">
              Profile Settings
            </h1>
            <div className="w-8"></div>
          </div>

          <div className="p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
