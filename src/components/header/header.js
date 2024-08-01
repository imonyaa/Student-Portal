import React from "react";
import logo from "../../public/images/logo.svg";
import { useNavigate } from "react-router-dom";

import "./header.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = ({ openNav, setOpenNav, isLoggedIn }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setOpenNav(!openNav);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="left-container">
          <button
            onClick={handleClick}
            className={isLoggedIn ? "nav-button" : "invisible "}
          >
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
          <button
            className="logo-button"
            onClick={() => {
              isLoggedIn ? navigate("/dashboard") : navigate("/login");
            }}
          >
            <img src={logo} class="h-12" />
          </button>
        </div>
        {isLoggedIn && (
          <button
            className="right-container"
            onClick={() => navigate("/profile")}
          >
            <h2 className="username">Otmanine Imane</h2>
            <img
              className=" h-12 w-12 rounded-full object-cover cursor-pointer"
              src={
                "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
              }
              alt=""
            />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
