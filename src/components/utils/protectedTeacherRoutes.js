import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedTeacherRoutes = () => {
  const { user } = useSelector((state) => state.userReducer);
  const role = user?.role;
  return role === "student" && role == null ? (
    <Navigate to="/lop" />
  ) : (
    <Outlet />
  );
};
export default ProtectedTeacherRoutes;
