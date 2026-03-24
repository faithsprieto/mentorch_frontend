import React from "react";
import "../../styles/orgCard.css";

const OrgCard = ({ title, description, image, created_at }) => {
  return (
    <div className="org-card">
      <img
        src={
          image
            ? `http://localhost/mentorchcd4again4/public/uploads/${image}`
            : "/default-org.png"
        }
        alt={title}
        className="org-image"
      />

      <div className="org-body">
        <h5 className="org-title">{title}</h5>

        <p className="org-text">{description}</p>

        <p className="org-date">
          <small>
            {new Date(created_at).toLocaleDateString()}
          </small>
        </p>
      </div>
    </div>
  );
};

export default OrgCard;