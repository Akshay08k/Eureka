import {
  FiUser,
  FiEdit3,
  FiShield,
  FiBell,
  FiLink,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

const Sidebar = ({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  closeMobileMenu,
}: any) => {
  const sidebarItems = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "personal", label: "Personal Details", icon: FiEdit3 },
    { id: "security", label: "Security", icon: FiShield },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "social", label: "Social Links", icon: FiLink },
  ];

  return (
    <div
      className={`
    fixed lg:absolute
    lg:top-[12vh] lg:left-[10vw]
    pt-[10vh]
    left-0 inset-y-0 z-40 w-64
    lg:pt-0
    lg:h-[80vh] lg:rounded-3xl
    transform transition-transform duration-300 ease-in-out
    bg-white dark:bg-gray-800 lg:bg-transparent lg:dark:bg-transparent
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
    >
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600   ">
        <h1 className="text-xl font-bold text-black dark:text-white">
          Settings
        </h1>
        <button
          onClick={closeMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-3">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              closeMobileMenu();
            }}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden
              ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                  : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-102"
              }
            `}
          >
            <item.icon
              className={`w-5 h-5 mr-3 relative z-10
                ${
                  activeTab === item.id
                    ? "text-white"
                    : "text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                }
              `}
            />
            <span className="font-medium relative z-10">{item.label}</span>
            {activeTab === item.id && (
              <FiChevronRight className="w-4 h-4 ml-auto text-white relative z-10" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
