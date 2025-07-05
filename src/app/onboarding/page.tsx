"use client";
import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiBookOpen,
  FiSettings,
  FiEdit3,
  FiCheckCircle,
  FiArrowRight,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiBell,
  FiMoon,
  FiSun,
  FiUsers,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
interface UserData {
  name: string;
  email: string;
  role: "student" | "faculty" | "admin";
  image?: string;
  onboarding: {
    completed: boolean;
    currentStep: number;
  };
}

interface UserProfile {
  academicInfo?: {
    year: string;
    branch: string;
    semester: string;
  };
  facultyInfo?: {
    department: string;
    subjects: string[];
    institution: string;
  };
  interests: string[];
  preferences: {
    visibility: "public" | "private";
    notifications: boolean;
    darkMode: boolean;
  };
  bio: string;
  profilePictureUrl: string;
}

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const EurekaOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    role: "student",
    onboarding: {
      completed: false,
      currentStep: 1,
    },
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    academicInfo: {
      year: "",
      branch: "",
      semester: "",
    },
    facultyInfo: {
      department: "",
      subjects: [],
      institution: "",
    },
    interests: [],
    preferences: {
      visibility: "public",
      notifications: true,
      darkMode: false,
    },
    bio: "",
    profilePictureUrl: "",
  });

  const [newInterest, setNewInterest] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to Eureka!",
      description:
        "Let's start by getting to know you. Tell us your basic information.",
      icon: FiUser,
    },
    {
      id: 2,
      title: "Academic Details",
      description:
        "Share your academic background to help us personalize your experience.",
      icon: FaGraduationCap,
    },
    {
      id: 3,
      title: "Your Interests",
      description:
        "What topics and fields are you passionate about? This helps us connect you with like-minded peers.",
      icon: FiBookOpen,
    },
    {
      id: 4,
      title: "Profile & Preferences",
      description:
        "Customize your profile visibility and notification settings.",
      icon: FiSettings,
    },
    {
      id: 5,
      title: "Tell Us About Yourself",
      description:
        "Add a bio and profile picture to make your profile more engaging.",
      icon: FiEdit3,
    },
    {
      id: 6,
      title: "You're All Set!",
      description:
        "Welcome to the Eureka community! You're ready to start collaborating.",
      icon: FiCheckCircle,
    },
  ];

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !userProfile.interests.includes(newInterest.trim())
    ) {
      setUserProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setUserProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const addSubject = () => {
    if (
      newSubject.trim() &&
      !userProfile.facultyInfo?.subjects.includes(newSubject.trim())
    ) {
      setUserProfile((prev) => ({
        ...prev,
        facultyInfo: {
          ...prev.facultyInfo!,
          subjects: [...(prev.facultyInfo?.subjects || []), newSubject.trim()],
        },
      }));
      setNewSubject("");
    }
  };

  const removeSubject = (subject: string) => {
    setUserProfile((prev) => ({
      ...prev,
      facultyInfo: {
        ...prev.facultyInfo!,
        subjects: prev.facultyInfo?.subjects.filter((s) => s !== subject) || [],
      },
    }));
  };

  const saveProgress = () => {
    console.log("Saving progress...", { userData, userProfile });
    // Here you would typically send data to your backend
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      setUserData((prev) => ({
        ...prev,
        onboarding: {
          ...prev.onboarding,
          currentStep: currentStep + 1,
        },
      }));
      saveProgress();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setUserData((prev) => ({
        ...prev,
        onboarding: {
          ...prev.onboarding,
          currentStep: currentStep - 1,
        },
      }));
    }
  };

  const completeOnboarding = () => {
    setUserData((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        completed: true,
      },
    }));
    console.log("Onboarding completed!", { userData, userProfile });
    // Here you would typically redirect to the main app
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return userData.name.trim() && userData.email.trim() && userData.role;
      case 2:
        if (userData.role === "student") {
          return (
            userProfile.academicInfo?.year &&
            userProfile.academicInfo?.branch &&
            userProfile.academicInfo?.semester
          );
        } else if (userData.role === "faculty") {
          return (
            userProfile.facultyInfo?.department &&
            userProfile.facultyInfo?.institution
          );
        }
        return true;
      case 3:
        return userProfile.interests.length > 0;
      case 4:
      case 5:
        return true;
      default:
        return true;
    }
  };

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div
        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / steps.length) * 100}%` }}
      />
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    setUserData((prev) => ({ ...prev, role: "student" }))
                  }
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userData.role === "student"
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FaGraduationCap className="mx-auto mb-2" size={24} />
                  Student
                </button>
                <button
                  onClick={() =>
                    setUserData((prev) => ({ ...prev, role: "faculty" }))
                  }
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userData.role === "faculty"
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FiUsers className="mx-auto mb-2" size={24} />
                  Faculty
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {userData.role === "student" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year *
                  </label>
                  <select
                    value={userProfile.academicInfo?.year || ""}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        academicInfo: {
                          ...prev.academicInfo!,
                          year: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select your year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post-Graduate">Post-Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch/Major *
                  </label>
                  <input
                    type="text"
                    value={userProfile.academicInfo?.branch || ""}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        academicInfo: {
                          ...prev.academicInfo!,
                          branch: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Computer Science, Mechanical Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Semester *
                  </label>
                  <select
                    value={userProfile.academicInfo?.semester || ""}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        academicInfo: {
                          ...prev.academicInfo!,
                          semester: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select semester</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={userProfile.facultyInfo?.department || ""}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        facultyInfo: {
                          ...prev.facultyInfo!,
                          department: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., Computer Science Department"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    value={userProfile.facultyInfo?.institution || ""}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        facultyInfo: {
                          ...prev.facultyInfo!,
                          institution: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., University of Technology"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subjects You Teach
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSubject()}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add a subject"
                    />
                    <button
                      onClick={addSubject}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.facultyInfo?.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1"
                      >
                        {subject}
                        <button
                          onClick={() => removeSubject(subject)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Your Interests *
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Add topics you're passionate about to help us connect you with
                relevant content and people.
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addInterest()}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Machine Learning, Physics, Literature"
                />
                <button
                  onClick={addInterest}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userProfile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1"
                  >
                    {interest}
                    <button
                      onClick={() => removeInterest(interest)}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Profile Visibility
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={userProfile.preferences.visibility === "public"}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          visibility: e.target.value as "public" | "private",
                        },
                      }))
                    }
                    className="mr-3"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <FiEye className="text-indigo-600" />
                      <span className="font-medium">Public</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Anyone can view your profile and connect with you
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={userProfile.preferences.visibility === "private"}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          visibility: e.target.value as "public" | "private",
                        },
                      }))
                    }
                    className="mr-3"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <FiEyeOff className="text-indigo-600" />
                      <span className="font-medium">Private</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Only you can view your profile details
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div className="flex items-center gap-3">
                <FiBell className="text-indigo-600" />
                <div>
                  <span className="font-medium">Email Notifications</span>
                  <p className="text-sm text-gray-600">
                    Get notified about new connections and messages
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setUserProfile((prev) => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      notifications: !prev.preferences.notifications,
                    },
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  userProfile.preferences.notifications
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userProfile.preferences.notifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
              <div className="flex items-center gap-3">
                {userProfile.preferences.darkMode ? (
                  <FiMoon className="text-indigo-600" />
                ) : (
                  <FiSun className="text-indigo-600" />
                )}
                <div>
                  <span className="font-medium">Dark Mode</span>
                  <p className="text-sm text-gray-600">
                    Toggle between light and dark themes
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setUserProfile((prev) => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      darkMode: !prev.preferences.darkMode,
                    },
                  }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  userProfile.preferences.darkMode
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    userProfile.preferences.darkMode
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {userProfile.profilePictureUrl ? (
                    <img
                      src={userProfile.profilePictureUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-gray-400" size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={userProfile.profilePictureUrl}
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        profilePictureUrl: e.target.value,
                      }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter image URL"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Add a profile picture URL (optional)
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={userProfile.bio}
                onChange={(e) =>
                  setUserProfile((prev) => ({ ...prev, bio: e.target.value }))
                }
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us about yourself, your research interests, or what you're passionate about..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {userProfile.bio.length}/500 characters
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <FiCheckCircle className="text-green-600" size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to Eureka, {userData.name}!
              </h3>
              <p className="text-gray-600 mb-6">
                Your profile has been set up successfully. You're now ready to
                explore the platform, connect with peers, and start
                collaborating on exciting academic projects.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">
                  Next Steps:
                </h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>
                    • Explore the community and find like-minded academics
                  </li>
                  <li>• Join discussion groups related to your interests</li>
                  <li>• Start or participate in collaborative projects</li>
                  <li>• Share your knowledge and learn from others</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Eureka</h1>
          <p className="text-gray-600">Academic Collaboration Platform</p>
        </div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.id < currentStep
                      ? "bg-green-500 text-white"
                      : step.id === currentStep
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? (
                    <FiCheckCircle size={16} />
                  ) : (
                    <span className="text-sm">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <currentStepData.icon className="text-indigo-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>

          {/* Step Content */}
          <div className="mb-8">{renderStepContent()}</div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FiArrowLeft size={20} />
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isStepValid()
                    ? "bg-indigo-600 text-white hover:bg-purple-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
                <FiArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={completeOnboarding}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Get Started
                <FiCheckCircle size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Step Counter */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EurekaOnboarding;
