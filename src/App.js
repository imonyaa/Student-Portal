import { useState, useLocation, useEffect } from "react";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Courses from "./pages/courses/page";
import Dashboard from "./pages/dashboard/page";
import Assignments from "./pages/assignments/page";
import Calendar from "./pages/calender/page";
import Grades from "./pages/grades/page";
import Settings from "./pages/settings/page";
import ScrollToTop from "./components/scrollToTop";

function App() {

  document.title = Route.title||"Student Portal";

  const [openNav, setOpenNav] = useState(true);
  
  return (
    <div className="App">
      
      <ScrollToTop />
      <Header openNav={openNav} setOpenNav={setOpenNav} />
      <div className="page">
        <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
        <div className="page-content">
          <Routes>
            <Route path="/dashboard" index element={<Dashboard title ="Dashboard" />} />
            <Route path="/courses" element={<Courses title ="Courses"/>}  />
            <Route path="/assignments" element={<Assignments title ="Assignments"/>}  />
            <Route path="/calender" element={<Calendar title ="Calendar" />} />
            <Route path="/grades" element={<Grades title ="Grades"/>}  />
            <Route path="/settings" element={<Settings title ="Settings"/>}  />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<h1>404 ERROR Page not Available.</h1>} title ="No Page"/>
          </Routes>
        </div>
      </div>
      <div className="footer" />
    </div>
  );
}

export default App;
			