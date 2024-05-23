import { Icon } from "@iconify/react/dist/iconify.js";
import "./sidebar-element.css";
import { useNavigate } from "react-router-dom";
const SidebarElement = ({ label, icon, openNav, path, isActive }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <button
      className={`${isActive ? "sidebar-element-active" : ""} ${
        openNav && !isActive ? "sidebar-element" : "sidebar-element-closed"
      }`}
      onClick={handleClick}
    >
      <div className={`${!openNav ? "iconClose" : ""}`}>
        <Icon
          className={`icon ${!openNav ? "iconClose" : ""}`}
          fontSize={"2rem"}
          icon={icon}
          style={{ color: "#512E67" }}
        />
      </div>
      {openNav && <h1 className="label">{label}</h1>}
    </button>
  );
};
export default SidebarElement;
