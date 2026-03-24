import React from "react";
import "../../styles/featureCard.css";

const FeatureCard = ({ title, description, image }) => {
  const placeholder =
    "https://via.placeholder.com/150x200?text=No+Image";

  return (
    <div className="feature-card">
      <img
        src={image || placeholder}
        alt={title}
        className="feature-card-img"
      />

      <div className="card-img-overlay">
        <h5 className="feature-card-title">{title}</h5>
        <p className="feature-card-text">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;