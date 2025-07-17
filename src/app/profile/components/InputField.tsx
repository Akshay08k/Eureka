const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  icon: Icon,
}: any) => (
  <div>
    <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-300">
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-200 outline-none "
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default InputField;
