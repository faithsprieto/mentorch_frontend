import React from "react";
import "../../styles/announcementCard.css";

const AnnouncementCard = ({ title, description, image, created_at }) => {
  return (
    <div className="card">
      <img
        src={
          image
            ? `http://localhost/mentorchcd4again4/public/uploads/${image}`
            : "/default-org.png"
        }
        alt={title}
      />

      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        <p className="card-text">{description}</p>

        <p className="card-text">
          <small>{new Date(created_at).toLocaleString()}</small>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;