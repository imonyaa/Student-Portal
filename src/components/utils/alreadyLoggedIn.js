import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AlreadyLoggedIn = () => {
  const token = Cookies.get("accessToken");
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};
export default AlreadyLoggedIn;
