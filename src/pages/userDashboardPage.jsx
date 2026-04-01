import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/pagestyles/userPage.css";
import "../styles/CommonStyles.css";
import "../styles/CommonButtonStyles.css";

import UserBasicInfo from "../components/user/userBasicInfo";
import UserSideNav from "../components/user/userSideNav";

// ✅ IMPORT TABS
import UserProfileTab from "../components/user/tabs/ProfileTab";
import ProgressTab from "../components/user/tabs/ProgressTab";
import SettingsTab from "../components/user/tabs/SettingsTab";

export default function UserDashboardPage() {
  const [tab, setTab] = useState("User");

  const [about, setAbout] = useState("");
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const [goals, setGoals] = useState("");

  return (
    <div className="user-dash">
      <div className="user-container">

        {/* LEFT NAV */}
        <div className="left-content">
          <UserSideNav tab={tab} setTab={setTab} />
        </div>

        {/* MAIN */}
        <div className="user-main-content">

          {/* LEFT PROFILE */}
          <div className="user-info">
            <UserBasicInfo />

            <div className="red-button">
              <Link to="/loginPage">
                <button className="logout">Sign out</button>
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="user-profile-boxes">

            {tab === "User" && (
              <UserProfileTab
                about={about}
                setAbout={setAbout}
                strength={strength}
                setStrength={setStrength}
                weakness={weakness}
                setWeakness={setWeakness}
                goals={goals}
                setGoals={setGoals}
              />
            )}

            {tab === "Progress" && <ProgressTab />}
            {tab === "Settings" && <SettingsTab />}

          </div>

        </div>
      </div>
    </div>
  );
}