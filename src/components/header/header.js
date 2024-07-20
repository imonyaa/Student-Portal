import React from "react";
import logo from "../../public/images/logo.svg";
import { useNavigate } from "react-router-dom";

import "./header.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = ({ openNav, setOpenNav }) => {
  const navigate= useNavigate();
  const handleClick = () => {
    setOpenNav(!openNav);
  };

  const handleProfileClick = () => {
    navigate("/profile");
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
          <img src={logo} height = "50rem" />
        </div>
        <button className="right-container"  onClick={handleProfileClick}  >
          <h2 className="username" >Otmanine Imane</h2>
          <img
            className="user-image"
            src={"https://randomuser.me/api/portraits/women/49.jpg"}
            alt=""
            
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
