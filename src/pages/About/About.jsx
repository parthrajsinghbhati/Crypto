import React, { useContext } from "react";
import "./About.css";
import Testimonial from "./Testimonial";
import hero from "../../assets/hero-img.jpg";
import { FaClock, FaHeart, FaBalanceScale, FaUserTie, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";

export const About = () => {
  const { user } = useContext(CoinContext);
  const features = [
    {
      icon: FaClock,
      title: "Live Crypto Prices",
      desc: "Track real-time prices and market trends for thousands of cryptocurrencies, updated every second.",
    },
    {
      icon: FaHeart,
      title: "Personalized Watchlists",
      desc: "Create and manage your own watchlists. Get instant alerts and never miss a market move.",
    },
    {
      icon: FaBalanceScale,
      title: "Smart Coin Comparison",
      desc: "Compare coins side-by-side with advanced analytics and make informed investment decisions.",
    },
  ];

  const team = [
    {
      name: "Parth Raj Singh Bhati",
      role: "Founder & Lead Developer",
      icon: FaUserTie,
      email: "parthraj.bhati2024@nst.rishihood.edu.in"
    }
  ];

  return (
    <div className="about-container">
      <section className="hero-section">
        <img src={hero} alt="Crypto" className="hero-img" />
        <div className="hero-text">
          <h1>Welcome to Cryptoplace</h1>
          <p>
            The all-in-one platform for tracking, analyzing, and comparing cryptocurrencies. Whether you're a pro trader or just starting out, Cryptoplace gives you the tools and insights to succeed in the fast-paced world of crypto.
          </p>
          <Link to={user ? "/" : "/login"} className="about-cta">Get Started</Link>
        </div>
      </section>

      <section className="features-section open-features">
        <h2 className="section-title">Why You'll Love Cryptoplace</h2>
        <div className="features open-features-list">
          {features.map((feature, index) => (
            <div className="open-feature" key={index}>
              <span className="open-feature-icon"><feature.icon /></span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-section modern-testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <Testimonial modern infiniteSlider />
      </section>

      <section className="team-section open-team">
        <h2 className="section-title">Meet the Team</h2>
        <div className="open-team-list">
          {team.map((member, idx) => (
            <div className="open-team-member" key={idx}>
              <span className="open-team-icon"><member.icon /></span>
              <div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <a href={`mailto:${member.email}`} className="open-team-email"><FaEnvelope /> {member.email}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-contact">
        <h2 className="section-title">Contact Us</h2>
        <p>Have questions or feedback? Reach out at <a href="mailto:parthraj.bhati2024@nst.rishihood.edu.in">parthraj.bhati2024@nst.rishihood.edu.in</a> and we'll get back to you soon!</p>
      </section>
    </div>
  );
};

export default About;
