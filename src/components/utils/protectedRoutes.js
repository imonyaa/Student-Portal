import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setUser } from "../../state/user/userSlice";

const ProtectedRoutes = () => {
  const token = Cookies.get("accessToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

//how do i check if the token is expired?

export default ProtectedRoutes;
