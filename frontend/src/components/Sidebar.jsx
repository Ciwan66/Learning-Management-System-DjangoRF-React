import React, { useState ,useContext} from "react";
import SchoolIcon from "@mui/icons-material/School";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MessageIcon from "@mui/icons-material/Message";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AuthContext from "../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="container">
      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="top_section">
          <h1 className={`logo ${isOpen ? "show" : ""}`}>Udemy</h1>
          <div className={`bars ${isOpen ? "shift" : ""}`}>
            <LocalLibraryIcon />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className={`link_text ${isOpen ? "show" : ""}`}>
              {item.name}
            </div>
          </NavLink>
        ))}
        <div className="link" onClick={()=>{logoutUser()}} style={{marginTop:"50px"}}>
          <div className="icon">{<MeetingRoomIcon />}</div>
          <div className={`link_text ${isOpen ? "show" : ""}`}>Logout</div>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const menuItem = [
  { path: "/teacher/dashboard", name: "Dashboard", icon: <DashboardIcon /> },
  { path: "/teacher/courses", name: "Courses", icon: <SchoolIcon /> },
  { path: "/teacher/coursess", name: "Communication", icon: <MessageIcon /> },
  { path: "/teacher/coursess", name: "Tools", icon: <PlumbingIcon /> },
];

export default Sidebar;
