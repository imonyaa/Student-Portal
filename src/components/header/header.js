import React from "react";

import "./header.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = ({ openNav, setOpenNav }) => {
  const handleClick = () => {
    setOpenNav(!openNav);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="left-container">
          <button onClick={handleClick} className="nav-button">
            {openNav ? (
              <Icon
                fontSize={"2.5rem"}
                icon="mingcute:close-line"
                style={{ color: "#512E67" }}
              />
            ) : (
              <Icon
                fontSize={"2.5rem"}
                icon="charm:menu-hamburger"
                style={{ color: "#512E67" }}
              />
            )}
          </button>
          <h1 className="title">Student Portal</h1>
        </div>
        <div className="right-container">
          <h2 className="username">Imane Otmanine</h2>
          <img
            className="user-image"
            src={"https://randomuser.me/api/portraits/women/49.jpg"}
            alt=""
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
