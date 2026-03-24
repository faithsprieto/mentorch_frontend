import React from "react";
import "../../styles/pagestyles/forumHomePage.css";
import "../../styles/CommonButtonStyles.css";

import homeImg from "../../assets/images/icons/home.png";
import threadImg from "../../assets/images/icons/thread.png";
import bookmarkImg from "../../assets/images/icons/bookmark.png";

const ForumNav = ({ tab, setTab }) => {

  return (
    <div className="forum-tabs">

    <div 
    style={{display: "block"}}
    className="glass-buttons">
      <button
        className={`side-btn ${tab === "Home" ? "active" : ""}`}
        onClick={() => setTab("Home")}
      >
        <img src={homeImg} alt="home-icon" />
      </button>

      <button
        className={`side-btn ${tab === "Bookmarks" ? "active" : ""}`}
        onClick={() => setTab("Bookmarks")}
      >
        <img src={bookmarkImg} alt="bookmark-icon" />
      </button>

      <button
        className={`side-btn ${tab === "Threads" ? "active" : ""}`}
        onClick={() => setTab("Threads")}
      >
        <img src={threadImg} alt="threads-icon" />
      </button>

    </div>
    </div>
  );
};

export default ForumNav;