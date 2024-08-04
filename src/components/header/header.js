import React from "react";
import logo from "../../public/images/logo.svg";
import { useNavigate } from "react-router-dom";

import "./header.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const Header = ({ openNav, setOpenNav, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = React.useState(false);
  const handleBorgarClick = () => {
    setOpenNav(!openNav);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="left-container">
          <button
            onClick={handleBorgarClick}
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
          <div>
            <button
              className="right-container relative"
              onClick={() => setShowDropdown(!showDropdown)}
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

            {showDropdown && (
              <div className="dropdown flex flex-col justify-evenly absolute top-14 right-14 bg-softPurple w-32 h-20 rounded-2xl border-[1px] border-palePurple">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/profile");
                    setShowDropdown(false);
                  }}
                >
                  View profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
