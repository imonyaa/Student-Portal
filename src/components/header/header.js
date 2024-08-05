import React from "react";
import logo from "../../public/images/logo.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./header.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { setUser } from "../../state/user/userSlice";

const Header = ({ openNav, setOpenNav, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = React.useState(false);
  const handleBorgarClick = () => {
    setOpenNav(!openNav);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser({});
    setIsLoggedIn(false);
    navigate("/login");
  };
  const { firstName, lastName, profileImage } = useSelector(
    (state) => state.userReducer.user
  );
  const fullName = `${firstName} ${lastName}`;

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
              <h2 className="username">{fullName}</h2>
              <img
                className=" h-12 w-12 rounded-full object-cover cursor-pointer"
                src={profileImage}
                alt=""
              />
            </button>

            {showDropdown && (
              <div className="dropdown flex flex-col justify-evenly  absolute top-[60px] right-4 bg-softPurple w-32 h-20 rounded-2xl border-[1px] border-palePurple divide-y-[1px] divide-lilac">
                <div className="">
                  <button
                    className="dropdown-item "
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                  >
                    View profile
                  </button>
                </div>
                <div className="pt-1">
                  <button
                    className="dropdown-item "
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
