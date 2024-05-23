import { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import Courses from "./pages/courses/page";
import Dashboard from "./pages/dashboard/page";
import ScrollToTop from "./components/scrollToTop";

function App() {
  const [openNav, setOpenNav] = useState(true);

  return (
    <div className="App">
      <ScrollToTop />
      <Header openNav={openNav} setOpenNav={setOpenNav} />
      <div className="page">
        <Sidebar openNav={openNav} setOpenNav={setOpenNav} />
        <div className="page-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/assignments" element={<h1>Assignments</h1>} />
            <Route path="/calender" element={<h1>Calender</h1>} />
            <Route path="/grades" element={<h1>Grades</h1>} />
            <Route path="/settings" element={<h1>Settings</h1>} />
          </Routes>
        </div>
      </div>
      <div className="footer" />
    </div>
  );
}

export default App;
