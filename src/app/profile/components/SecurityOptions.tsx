import { FiCheck } from "react-icons/fi";

const SecurityOption = ({
  title,
  description,
  icon: Icon,
  actionText,
  actionColor,
  actionTextOnText,
  isEnabled = false,
  setEnabled = () => {},
}: any) => (
  <div
    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl dark:bg-gray-700 ${
      isEnabled ? "bg-green-500" : "bg-gray-50"
    }`}
    onClick={() => setEnabled(!isEnabled)}
  >
    <div className="flex items-center mb-3 sm:mb-0">
      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium dark:text-gray-300 text-black">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
    {isEnabled ? (
      <span className="inline-flex items-center px-3 py-3 rounded-full text-sm font-medium bg-green-200 text-green-800">
        <FiCheck className="w-4 h-4 mr-1" />
        {isEnabled ? actionTextOnText : actionText}
      </span>
    ) : (
      <button
        className="flex items-center px-4 py-2 text-white rounded-lg transition-colors bg-green-600 hover:bg-green-700"
        style={{ backgroundColor: actionColor }}
      >
        {actionText}
      </button>
    )}
  </div>
);

export default SecurityOption;
