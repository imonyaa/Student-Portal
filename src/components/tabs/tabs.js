const Tabs = ({
  selectedIndex = 0,
  className,
  onTabChange = (index) => {},
  tabs = [],
}) => {
  return (
    <div className="w-[90%] mx-auto">
      <ul
        className={`flex justify-center items-center gap-20 border border-b-gray-200 border-transparent ${className}`}
      >
        {tabs.map((tab, index) => (
          <li
            className={`cursor-pointer text-base py-2 font-outfit font-semibold ${
              tab.value === selectedIndex
                ? "text-darkPurple border-b-2 border-b-darkPurple"
                : "text-palePurple"
            }`}
            key={index}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
