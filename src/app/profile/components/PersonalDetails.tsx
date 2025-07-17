import {
  FiSmartphone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiSave,
} from "react-icons/fi";
import InputField from "./InputField";

const PersonalDetails = ({ userInfo, setUserInfo }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold dark:text-gray-300 text-black">
          Personal Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Update your personal information and contact details
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InputField
            label="Email Address"
            type="email"
            value={userInfo.email}
            onChange={(e: { target: { value: any } }) =>
              setUserInfo((prev: any) => ({ ...prev, email: e.target.value }))
            }
            placeholder="john@example.com"
            icon={FiMail}
          />
          <InputField
            label="Phone Number"
            type="tel"
            value={userInfo.phone}
            onChange={(e: { target: { value: any } }) =>
              setUserInfo((prev: any) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="+1 (555) 123-4567"
            icon={FiSmartphone}
          />
          <InputField
            label="Location"
            type="text"
            value={userInfo.location}
            onChange={(e: { target: { value: any } }) =>
              setUserInfo((prev: any) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            placeholder="San Francisco, CA"
            icon={FiMapPin}
          />
          <InputField
            label="Website"
            type="url"
            value={userInfo.website}
            onChange={(e: { target: { value: any } }) =>
              setUserInfo((prev: any) => ({ ...prev, website: e.target.value }))
            }
            placeholder="https://johndoe.dev"
            icon={FiGlobe}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="flex items-center px-6 py-3 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: "#6C63FF" }}
          >
            <FiSave className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
