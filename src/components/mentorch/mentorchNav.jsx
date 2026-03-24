import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/CommonButtonStyles.css";

const MentorchNav = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Find yours", path: "/mentorchipPage" },
    { label: "Requests", path: "/mentorchipRequestsPage" },
    { label: "Evaluation", path: "/mentorchipEvaluPage" },
    { label: "Messages", path: "/messagesPage" },
  ];

  return (
    <div className="glass-buttons">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default MentorchNav;