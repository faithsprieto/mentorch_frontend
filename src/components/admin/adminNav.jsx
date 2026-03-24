import React, { useState } from "react";
import "../../styles/CommonButtonStyles.css";

const AdminNav = ({ onNavigate }) => {
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { label: "STATS", key: "stats" },
    { label: "ADMINS", key: "admins" },
    { label: "USERS", key: "users" },
    { label: "DEPTS", key: "departments" },
    { label: "COURSES", key: "courses" },
    { label: "TAGS", key: "keywords" },
  ];

  return (
    <div className="glass-buttons">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => onNavigate(item.key)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={hovered === index ? "hovered" : ""}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default AdminNav;