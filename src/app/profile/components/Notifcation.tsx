import { FiMail } from "react-icons/fi";

const NotificationSettings = ({ notifications, setNotifications }: any) => {
  const handleNotificationChange = (key: string) => {
    setNotifications((prev: { [x: string]: any }) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold dark:text-gray-300 text-black">
          Notification Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage how you receive notifications
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 lg:p-8">
        <h3 className="text-lg font-semibold mb-6 flex items-center text-gray-500">
          <FiMail className="w-5 h-5 mr-2 text-gray-500" />
          Email Notifications
        </h3>

        <div className="space-y-4">
          {[
            {
              key: "email",
              label: "Email notifications",
              desc: "Receive notifications via email",
            },
            {
              key: "marketing",
              label: "Marketing emails",
              desc: "Receive promotional and marketing emails",
            },
            {
              key: "security",
              label: "Security alerts",
              desc: "Important security notifications",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <div className="flex-1">
                <p className="font-medium dark:text-gray-300 text-black">
                  {item.label}
                </p>
                <p className="text-sm dark:text-gray-500 text-gray-600">
                  {item.desc}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[item.key] ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                    notifications[item.key] ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
