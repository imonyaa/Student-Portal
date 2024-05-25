import { useState, useLocation, useEffect } from "react";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import Courses from "./pages/courses/page";
import Dashboard from "./pages/dashboard/page";
import ScrollToTop from "./components/scrollToTop";

function App() {

  document.title = Route.title||"Student Portal";

  const [openNav, setOpenNav] = useState(true);
  
  return (
    <div className="App">
      <Header openNav={openNav} setOpenNav={setOpenNav} />
      <div className="page">
        <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
        <div className="page-content">
          <Routes>
            <Route path="/dashboard" index element={<Dashboard title ="Dashboard" />} />
            <Route path="/courses" element={<Courses title ="Courses"/>}  />
            <Route path="/assignments" element={<h1>Assignments</h1>} title ="Assignments" />
            <Route path="/calender" element={<h1>Calender</h1>} title ="Calendar" />
            <Route path="/grades" element={<h1>Grades</h1>} title ="Grades" />
            <Route path="/settings" element={<h1>Settings</h1>} title ="Settings" />
          </Routes>
        </div>
      </div>
      <div className="footer" />
    </div>
  );
}

export default App;
