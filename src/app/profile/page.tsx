"use client";
import React, { useEffect, useState } from "react";
import ProfileOverview from "./components/ProfileOverView";
import SecuritySettings from "./components/SecuritySettings";
import NotificationSettings from "./components/Notifcation";
import SocialLinks from "./components/SocialLinks";
import PersonalDetails from "./components/PersonalDetails";
import Sidebar from "./components/Sidebar";
import { FiMenu } from "react-icons/fi";
import axios from "@/app/lib/axios";
import { User } from "../../../types";
import Loader from "../components/RocketLoader";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const initialNotifications = {
  email: true,
  marketing: false,
  security: true,
};

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl || "profile");

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((res) => {
        console.log("User data:", res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.put("/api/user/update", userInfo);
      if (res.status === 200) {
        toast.success("Profile updated successfully", {
          duration: 700,
          position: "top-center",
        });
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!userInfo) {
    return <Loader />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileOverview
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSaveProfile={handleSave}
          />
        );
      case "personal":
        return (
          <PersonalDetails
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            handleSave={handleSave}
          />
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
        return (
          <SocialLinks
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            handleSave={handleSave}
          />
        );
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

      <Toaster />
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
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
