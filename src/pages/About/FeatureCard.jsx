import React from "react";
import "./FeatureCard.css";

const FeatureCard = ({ icon: Icon, title, desc }) => {
  return (
    <div className="feature-card">
      <div className="icon-wrapper">
        {Icon && <Icon className="feature-icon" />}
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
};

export default FeatureCard;
