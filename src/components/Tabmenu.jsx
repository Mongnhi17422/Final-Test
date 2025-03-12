import { useLocation, useNavigate } from "react-router-dom";

function TabsMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex justify-around border-b border-gray-300 text-lg font-semibold">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => navigate(`/${tab.key}`)}
          className={`w-[100px] py-2 ${
            location.pathname.substring(1) === tab.key
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabsMenu;
