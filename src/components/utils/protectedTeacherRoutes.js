import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedTeacherRoutes = () => {
  const { user } = useSelector((state) => state.userReducer);
  const role = user?.role;
  return role === "teacher" ? <Outlet /> : <Navigate to="/lop" />;
};
export default ProtectedTeacherRoutes;
