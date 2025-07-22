const ToolbarButton = ({
  icon: Icon,
  action,
  label,
}: {
  icon: any;
  action: () => void;
  label?: string;
}) => (
  <button
    onClick={action}
    type="button"
    aria-label={label}
    className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
  >
        <Icon className="w-4 h-4 text-gray-800 dark:text-white" /> {" "}
  </button>
);


export default ToolbarButton