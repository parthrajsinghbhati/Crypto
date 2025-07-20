import React from "react";
import "./About.css";
import FeatureCard from "./FeatureCard";
import Testimonial from "./Testimonial";
import hero from "../../assets/hero-img.jpg";
import { FaClock, FaHeart, FaBalanceScale } from "react-icons/fa";

export const About = () => {
  const features = [
    {
      icon: FaClock,
      title: "Real-Time Data",
      desc: "Get updated prices from top cryptocurrencies every second.",
    },
    {
      icon: FaHeart,
      title: "Custom Watchlists",
      desc: "Track your favorite coins and build your personal dashboard.",
    },
    {
      icon: FaBalanceScale,
      title: "Compare Coins",
      desc: "Use powerful comparison tools to make informed decisions.",
    },
  ];

  return (
    <div className="about-container">
      <section className="hero-section">
        <img src={hero} alt="Crypto" className="hero-img" />
        <div className="hero-text">
          <h1>Welcome to CryptoTracker</h1>
          <p>
            Your all-in-one solution for tracking, analyzing, and comparing
            cryptocurrencies in real time.
          </p>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why CryptoTracker?</h2>
        <div className="features">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <h2 className="section-title">What Our Users Say</h2>
        <Testimonial />
      </section>
      
    </div>
  );
};

export default About;
