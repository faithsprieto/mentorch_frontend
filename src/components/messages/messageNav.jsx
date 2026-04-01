import React from "react";
import "../../styles/pagestyles/messagesPage.css";

const MessageNav = ({ tab, setTab }) => {
  return (
    <div className="msg-tabs">

      <button
        className={`side-btn ${tab === "ALL" ? "active" : ""}`}
        onClick={() => setTab("ALL")}
      >
        ALL
      </button>

      <button
        className={`side-btn ${tab === "MT" ? "active" : ""}`}
        onClick={() => setTab("MT")}
      >
        MT
      </button>

      <button
        className={`side-btn ${tab === "GC" ? "active" : ""}`}
        onClick={() => setTab("GC")}
      >
        GC
      </button>

      <button
        className={`side-btn ${tab === "AI" ? "active" : ""}`}
        onClick={() => setTab("AI")}
      >
        AI
      </button>

    </div>
  );
};

export default MessageNav;