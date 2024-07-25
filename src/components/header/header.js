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
                fontSize={"2rem"}
                icon="mingcute:close-line"
                style={{ color: "#512E67" }}
              />
            ) : (
              <Icon
                fontSize={"2rem"}
                icon="charm:menu-hamburger"
                style={{ color: "#512E67" }}
              />
            )}
          </button>
          <img src={logo} class="h-12" />
        </div>
        <button className="right-container"  onClick={handleProfileClick}  >
          <h2 className="username" >Otmanine Imane</h2>
          <img
            className="user-image"
            src={"https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"}
            alt=""
            
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
