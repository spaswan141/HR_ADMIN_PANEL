import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./layout.css";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (currentPath == "/") {
      setTitle("Candidates");
    } else if (currentPath == "/employee") {
      setTitle("Employees");
    } else if (currentPath === "/attendance") {
      setTitle("Attendance");
    }else if(currentPath==="/leaves"){
      setTitle("Leaves")
    }
  }, [currentPath]);
  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Header / Topbar */}
        <Topbar title={title} />

        {/* Page Content */}
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
