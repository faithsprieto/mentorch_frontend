import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import "../../styles/CommonStyles.css";
import logo from "../../assets/images/mentorch_logo.png";

const Navbar = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/mainPage">
        <Tooltip title="Home">
          <img
            src={logo}
            alt="Mentorch Logo"
            className="logo-img"
          />
          </Tooltip>
        </Link>
      </div>

      {/* Center Links */}
      <ul className="navbar-links">
        <li>
          <Link
            to="/libraryPage"
            className={`nav-link ${hovered === "Library" ? "active" : ""}`}
            onMouseEnter={() => setHovered("Library")}
            onMouseLeave={() => setHovered(null)}
          >
            Library
          </Link>
        </li>

        <li>
          <Link
            to="/calendarPage"
            className={`nav-link ${hovered === "Calendar" ? "active" : ""}`}
            onMouseEnter={() => setHovered("Calendar")}
            onMouseLeave={() => setHovered(null)}
          >
            Calendar
          </Link>
        </li>

        <li>
          <Link
            to="/mentorchipPage"
            className={`nav-link ${hovered === "Mentorch" ? "active" : ""}`}
            onMouseEnter={() => setHovered("Mentorch")}
            onMouseLeave={() => setHovered(null)}
          >
            Mentorch
          </Link>
        </li>

        <li>
          <Link
            to="/forumHomePage"
            className={`nav-link ${hovered === "Forum" ? "active" : ""}`}
            onMouseEnter={() => setHovered("Forum")}
            onMouseLeave={() => setHovered(null)}
          >
            Forum
          </Link>
        </li>

        <li>
          <Link
            to="/messagesPage"
            className={`nav-link ${hovered === "Messages" ? "active" : ""}`}
            onMouseEnter={() => setHovered("Messages")}
            onMouseLeave={() => setHovered(null)}
          >
            Messages
          </Link>
        </li>
      </ul>

      {/* User Icon */}
      <div className="navbar-user">
        <Link to="/userDashboardPage">
          <Tooltip title="Profile">
            <UserOutlined className="user-icon" />
          </Tooltip>
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;