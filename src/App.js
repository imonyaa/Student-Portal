import { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Courses from "./pages/courses/page";
import Dashboard from "./pages/dashboard/page";
import Assignments from "./pages/assignments/page";
import Login from "./pages/login/page";
import Calendar from "./pages/calendar/page";
import Grades from "./pages/grades/page";
import Profile from "./pages/profile/page";
import ScrollToTop from "./components/utils/scrollToTop";
import ProtectedRoutes from "./components/utils/protectedRoutes";
import Cookies from "js-cookie";
import AlreadyLoggedIn from "./components/utils/alreadyLoggedIn";
import CourseDetails from "./pages/course-details/page";
import CreateCourse from "./pages/create-course/page";

function App() {
  document.title = Route.title || "Student Portal";

  const [openNav, setOpenNav] = useState(true);
  const isToken = Cookies.get("accessToken") ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(isToken);

  return (
    <div className="App">
      <ScrollToTop />
      <Header
        openNav={openNav}
        setOpenNav={setOpenNav}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/dashboard"
            index
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <Dashboard title="Dashboard" />
                </div>
              </div>
            }
          />
          <Route
            path="/courses"
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <Courses title="Courses" />
                </div>
              </div>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <CourseDetails title="Course Details" />
                </div>
              </div>
            }
          />
          <Route
            path="/courses/create-course"
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <CreateCourse title="Create a course" />
                </div>
              </div>
            }
          />
          <Route
            path="/assignments"
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <Assignments title="Assignments" />
                </div>
              </div>
            }
          />
          <Route
            path="/calender"
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <Calendar title="Calendar" />
                </div>
              </div>
            }
          />
          <Route
            path="/grades"
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <Grades title="Grades" />
                </div>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="page">
                <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
                <div className="page-content">
                  <Profile title="Profile" />
                </div>
              </div>
            }
          />
          <Route
            path="/"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
          />
        </Route>
        <Route element={<AlreadyLoggedIn />}>
          <Route
            path="/login"
            element={
              <div className="page ">
                <div className="page-content">
                  <Login
                    title="Student Portal"
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </div>
              </div>
            }
          />
        </Route>
        <Route
          path="*"
          element={<h1>404 ERROR Page not Available.</h1>}
          title="No Page"
        />
      </Routes>
      <div className="footer" />
    </div>
  );
}

export default App;
