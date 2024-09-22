import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { setUser } from "../../state/user/userSlice";
import axios from "../../api/axios";
import { useDispatch } from "react-redux";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const fetchUser = async (token) => {
    if (token) {
      try {
        const response = await axios.get("http://localhost:3500/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(response?.data));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const token = Cookies.get("accessToken");

  fetchUser(token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
