import { FaHandsHelping } from "react-icons/fa";
import { FiEdit3, FiCamera, FiX, FiUser, FiSave } from "react-icons/fi";
import StatCard from "./StateCard";
import { BiSolidVector } from "react-icons/bi";
const ProfileOverview = ({
  userInfo,
  setUserInfo,
  isEditing,
  setIsEditing,
}: any) => {
  const handleSaveProfile = () => {
    setIsEditing(false);
  };

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
          <p className="text-gray-400  mt-1">
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
          {/* Avatar Section */}
          <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
            <div className="relative group">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full  border-4 border-gray-500 ">
                <img
                  src={userInfo.avatar}
                  alt={userInfo.fullName}
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              {isEditing && (
                <button
                  className="absolute bg-black text-white bottom-2 right-2 p-3 rounded-full dark:bg-white dark:text-black 
                 transition-all duration-200 transform hover:scale-110 shadow-lg"
                >
                  <FiCamera className="w-5 h-5 " />
                </button>
              )}
            </div>
            <div className="mt-4 text-center lg:text-left">
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "#6C63FF20", color: "#5B5F97" }}
              >
                Member since {userInfo.joinDate}
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
                    value={userInfo.fullName}
                    onChange={(e) =>
                      setUserInfo((prev: any) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border rounded-xl resize-none transition-all duration-200 border-gray-500 outline-none"
                  />
                ) : (
                  <p className="text-lg text-gray-800 dark:text-gray-400">
                    {userInfo.fullName}
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
                  <p className="text-lg text-gray-800 dark:text-gray-400">
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
                <p className="text-lg text-gray-800 dark:text-gray-400">
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
        <StatCard title="Followers" value="24" icon={FiUser} color="#6C63FF" />
        <StatCard
          title="Contributions"
          value="1234"
          icon={FaHandsHelping}
          color="#5B5F97"
        />
        <StatCard
          title="Solved Problems"
          value="567"
          icon={BiSolidVector}
          color="#10B981"
        />
      </div>
    </div>
  );
};

export default ProfileOverview;
