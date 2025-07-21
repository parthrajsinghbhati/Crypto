import React, { useRef, useEffect, useState } from "react";
import "./Testimonial.css";
import { FaStar } from "react-icons/fa";

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

const Testimonial = ({ modern, infiniteSlider }) => {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef();
  const cards = [...testimonials, ...testimonials]; // duplicate for seamless loop

  useEffect(() => {
    if (!infiniteSlider) return;
    const track = trackRef.current;
    if (!track) return;
    let animationId;
    let start;
    let lastTimestamp = 0;
    let translateX = 0;
    const speed = 50; // px per second

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      if (!isPaused) {
        translateX -= (speed * elapsed) / 1000;
        // Reset for infinite loop
        if (Math.abs(translateX) >= track.scrollWidth / 2) {
          translateX = 0;
        }
        track.style.transform = `translateX(${translateX}px)`;
      }
      animationId = requestAnimationFrame(step);
    }
    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, infiniteSlider]);

  return (
    <div
      className={modern ? "modern-testimonial-list infinite-slider" : "testimonial-slider"}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div
        className="testimonial-track-boxed"
        ref={trackRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ display: "flex", width: "max-content" }}
      >
        {cards.map((item, index) => (
          <div
            className="modern-testimonial-card boxed-marquee"
            key={index}
          >
            <img src={item.image} alt={item.name} className="testimonial-avatar" />
            <div className="testimonial-stars">
              {[...Array(item.rating)].map((_, i) => (
                <FaStar key={i} color="#ffd700" size={16} />
              ))}
            </div>
            <p className="testimonial-feedback">"{item.feedback}"</p>
            <h4 className="testimonial-name">- {item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
