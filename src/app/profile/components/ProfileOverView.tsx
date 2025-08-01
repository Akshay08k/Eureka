"use client";
import { FaHandsHelping } from "react-icons/fa";
import { FiEdit3, FiCamera, FiX, FiUser, FiSave } from "react-icons/fi";
import { BiSolidVector } from "react-icons/bi";
//components
import StatCard from "./StateCard";
import { formatJoinDate } from "@/utils/FormatDate";
const ProfileOverview = ({
  userInfo,
  setUserInfo,
  isEditing,
  setIsEditing,
  handleSaveProfile,
}: any) => {
  //   if (
  //     session?.user?.image ||
  //     session?.user?.name ||
  //     session?.user?.username
  //   ) {
  //     setUserInfo((prev: any) => ({
  //       ...prev,
  //       avatar: session?.user?.image || "/avatar.png",
  //     }));
  //     setUserInfo((prev: any) => ({ ...prev, fullName: session?.user?.name }));
  //     setUserInfo((prev: any) => ({
  //       ...prev,
  //       username: session?.user?.username || undefined,
  //     }));

  //     setUserInfo((prev: any) => ({
  //       ...prev,
  //       joinDate: session?.user?.createdAt
  //         ? formatJoinDate(session?.user?.createdAt)
  //         : undefined,
  //     }));
  //     setUserInfo((prev: any) => ({
  //       ...prev,
  //       bio: session?.user?.bio || "There is no bio",
  //     }));
  //   }
  // }, [session]);

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-black dark:text-white">
            Profile Overview
          </h2>
          <p className="text-gray-400 mt-1">
            Manage your public profile information
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center px-6 py-3 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl bg-indigo-600 hover:bg-indigo-700"
        >
          <FiEdit3 className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
            <div className="relative group">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full  border-4 border-gray-500 ">
                <img
                  src={userInfo.image}
                  alt={userInfo.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    id="avatarUpload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setUserInfo((prev: any) => ({
                          ...prev,
                          avatar: imageUrl,
                        }));
                      }
                    }}
                  />
                  <button
                    onClick={() =>
                      document.getElementById("avatarUpload")?.click()
                    }
                    className="absolute bg-black text-white bottom-2 right-2 p-3 rounded-full dark:bg-white dark:text-black 
      transition-all duration-200 transform hover:scale-110 shadow-lg"
                  >
                    <FiCamera className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 text-center lg:text-left">
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#6C63FF20", color: "#5B5F97" }}
              >
                Member since{" "}
                {userInfo.createdAt && formatJoinDate(userInfo.createdAt)}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-black dark:text-white ">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) =>
                      setUserInfo((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border rounded-xl resize-none transition-all duration-200 border-gray-500 outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-800 dark:text-gray-400">
                    {userInfo.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-300">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userInfo.username}
                    onChange={(e) =>
                      setUserInfo((prev: any) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border rounded-xl transition-all duration-200 border-gray-500  outline-none"
                  />
                ) : (
                  <p className="text-sm text-gray-800 dark:text-gray-400">
                    @{userInfo.username}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 dark:text-white text-black">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={userInfo.bio}
                  onChange={(e) =>
                    setUserInfo((prev: any) => ({
                      ...prev,
                      bio: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-4 py-3 border rounded-xl resize-none transition-all duration-200 border-gray-500 outline-none"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-sm text-gray-800 dark:text-gray-400">
                  {userInfo.bio}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center justify-center px-6 py-3 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: "#10B981" }}
                >
                  <FiSave className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center justify-center px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <FiX className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Followers"
          value={userInfo.followers}
          icon={FiUser}
          color="#6C63FF"
        />
        <StatCard
          title="Contributions"
          value={userInfo.contributions}
          icon={FaHandsHelping}
          color="#5B5F97"
        />
        <StatCard
          title="Solved Problems"
          value={userInfo.problemSolvedCount}
          icon={BiSolidVector}
          color="#10B981"
        />
      </div>
    </div>
  );
};

export default ProfileOverview;
