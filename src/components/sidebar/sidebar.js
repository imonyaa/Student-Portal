import React from "react";

import "./sidebar.css";
import SidebarElement from "./sidebar-element/sidebar-element";
import { useLocation } from "react-router-dom";

const Sidebar = ({ openNav, setOpenNav }) => {
  const links = [
    { label: "Dashboard", icon: "mage:dashboard-2", path: "/dashboard" },
    {
      label: "Courses",
      icon: "ph:books-light",
      path: "/courses",
    },
    {
      label: "Assignments",
      icon: "clarity:note-edit-line",
      path: "/assignments",
    },
    {
      label: "Calender",
      icon: "solar:calendar-broken",
      path: "/calender",
    },
    {
      label: "Grades",
      icon: "mynaui:list-check",
      path: "/grades",
    },
    {
      label: "Settings",
      icon: "solar:settings-linear",
      path: "/settings",
    },
  ];

  const { pathname } = useLocation();

  const handleClick = () => {
    setOpenNav(!openNav);
  };
  return (
    <div>
      <div className={`sidebar-spacer ${openNav ? "sidebarOpen" : ""} `} />
      <div className={`sidebar ${openNav ? "sidebarOpen" : ""}`}>
        {links.map((link, index) => (
          <SidebarElement
            label={link.label}
            icon={link.icon}
            key={index}
            handleClick={handleClick}
            openNav={openNav}
            path={link.path}
            isActive={pathname.includes(link.path.toLowerCase())}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
