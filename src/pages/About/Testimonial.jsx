import React, { useState } from "react";
import "./Testimonial.css";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Ravi Mehta",
    feedback: "CryptoTracker changed how I view crypto! The real-time data is a game changer.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5
  },
  {
    name: "Sneha Kapoor",
    feedback: "Accurate, fast, and beautiful UI. I love the personalized watchlists!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5
  },
  {
    name: "Aditya Roy",
    feedback: "The comparison feature is so powerful. I can make smarter decisions now.",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    rating: 4
  },
  {
    name: "Priya Sharma",
    feedback: "Makes tracking my portfolio super easy. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5
  },
  {
    name: "Rohit Gupta",
    feedback: "Even as a beginner, I feel in control now. The UI is top-notch.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4
  },
  {
    name: "Ayesha Khan",
    feedback: "Top-notch UI and fast updates. The best crypto tracker I've used!",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5
  },
];

const VISIBLE = 2;

const Testimonial = () => {
  const [start, setStart] = useState(0);
  const total = testimonials.length;

  const prev = () => setStart((prev) => (prev - 1 + total) % total);
  const next = () => setStart((prev) => (prev + 1) % total);

  // For peek effect, get prev, visible, next
  const getIndices = () => {
    const indices = [];
    indices.push((start - 1 + total) % total); // left peek
    for (let i = 0; i < VISIBLE; i++) {
      indices.push((start + i) % total);
    }
    indices.push((start + VISIBLE) % total); // right peek
    return indices;
  };
  const indices = getIndices();

  return (
    <div className="testimonial-peek-carousel">
      <button className="testimonial-arrow left" onClick={prev} aria-label="Previous testimonial">
        <FaChevronLeft />
      </button>
      <div className="testimonial-peek-track">
        {indices.map((idx, i) => (
          <div
            key={idx}
            className={`testimonial-peek-card${i === 1 || i === 2 ? " center" : " peek"}`}
          >
            <img src={testimonials[idx].image} alt={testimonials[idx].name} className="testimonial-avatar" />
            <div className="testimonial-stars">
              {[...Array(testimonials[idx].rating)].map((_, j) => (
                <FaStar key={j} color="#ffd700" size={16} />
              ))}
            </div>
            <p className="testimonial-feedback">"{testimonials[idx].feedback}"</p>
            <h4 className="testimonial-name">- {testimonials[idx].name}</h4>
          </div>
        ))}
      </div>
      <button className="testimonial-arrow right" onClick={next} aria-label="Next testimonial">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Testimonial;
