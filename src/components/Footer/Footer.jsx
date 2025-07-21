import React from "react";
import "./Footer.css";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Cryptoplace</span>
          <p className="footer-desc">Your trusted crypto tracker and portfolio manager.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/compare">Compare</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="footer-icons">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Cryptoplace - All Rights Reserved.</p>
        <button className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Back to Top ↑</button>
      </div>
    </footer>
  );
};

export default Footer;
