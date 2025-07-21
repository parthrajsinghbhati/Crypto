import React from "react";
import "./FeatureCard.css";

const FeatureCard = ({ icon: Icon, title, desc }) => {
  return (
    <div className="open-feature">
      <span className="open-feature-icon">{Icon && <Icon />}</span>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
