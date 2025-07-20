import React from "react";
import "./Testimonial.css";

const testimonials = [
  {
    name: "Ravi Mehta",
    feedback: "CryptoTracker changed how I view crypto!",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Sneha Kapoor",
    feedback: "Accurate, fast, and beautiful UI.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Aditya Roy",
    feedback: "I love the comparison feature. Game changer!",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    name: "Priya Sharma",
    feedback: "Makes tracking my portfolio super easy.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Rohit Gupta",
    feedback: "Even as a beginner, I feel in control now.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ayesha Khan",
    feedback: "Top-notch UI and fast updates.",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
];

const doubleTestimonials = [...testimonials, ...testimonials];

const Testimonial = () => {
  return (
    <div className="testimonial-slider">
      <div className="testimonial-track">
        {doubleTestimonials.map((item, index) => (
          <div className="testimonial-box" key={index}>
            <img src={item.image} alt={item.name} />
            <p>"{item.feedback}"</p>
            <h4>- {item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
