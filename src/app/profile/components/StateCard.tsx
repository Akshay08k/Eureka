const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 "
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <Icon className="w-6 h-6 dark:text-white text-black" />
      </div>
    </div>
  </div>
);

export default StatCard;
