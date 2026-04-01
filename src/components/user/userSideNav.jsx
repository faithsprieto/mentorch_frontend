import React from "react";
import "../../styles/pagestyles/forumHomePage.css";
import "../../styles/CommonButtonStyles.css";

import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import MentorchTorch from "../../assets/images/mentorch-torch-logo.png";

const UserSideNav = ({ tab, setTab }) => {
  return (
    <div className="user-dash-tabs">
      <div style={{ display: "block" }} className="glass-buttons">

        {/* USER */}
        <button
          className={`side-btn ${tab === "User" ? "active" : ""}`}
          onClick={() => setTab("User")}
        >
          <UserOutlined />
        </button>

        {/* TORCH → PROGRESS */}
        <button
          className={`side-btn ${tab === "Progress" ? "active" : ""}`}
          onClick={() => setTab("Progress")}
        >
          <img src={MentorchTorch} alt="torch-icon" />
        </button>

        {/* SETTINGS */}
        <button
          className={`side-btn ${tab === "Settings" ? "active" : ""}`}
          onClick={() => setTab("Settings")}
        >
          <SettingOutlined />
        </button>

      </div>
    </div>
  );
};

export default UserSideNav;