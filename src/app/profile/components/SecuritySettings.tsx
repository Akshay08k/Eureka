"use client";
import { useState } from "react";
import { FiLock, FiSmartphone, FiShield } from "react-icons/fi";
import SecurityOption from "./SecurityOptions";
const SecuritySettings = () => {
  const [isEnabled, setEnabled] = useState();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold dark:text-gray-300 text-black ">
          Security Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400  mt-1">
          Keep your account secure and protected
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
          <h3 className="text-lg font-semibold mb-6 flex items-center dark:text-gray-300 text-black">
            <FiLock className="w-5 h-5 mr-2 dark:text-gray-300 text-black" />
            Password & Authentication
          </h3>

          <div className="space-y-4">
            <SecurityOption
              title="Change Password"
              description="Last changed 3 months ago"
              icon={FiLock}
              actionText="Update Password"
              actionColor="#6C63FF"
            />
            <SecurityOption
              title="Two-Factor Authentication"
              description="Extra security for your account"
              icon={FiShield}
              actionText="Enable"
              actionTextOnText="Enabled"
              actionColor="green"
              isEnabled={isEnabled}
              setEnabled={setEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
