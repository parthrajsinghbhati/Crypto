import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuRef = useRef();
  const buttonRef = useRef();

  const handleCurrencyChange = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "euro":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`} ref={menuRef}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>
        <li>
          <Link to="/compare" onClick={() => setMenuOpen(false)}>
            Compare
          </Link>
        </li>
        <li>
          <Link to="/portfolio" onClick={() => setMenuOpen(false)}>
            Portfolio
          </Link>
        </li>

        {isMobile && (
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="login-btn">Login</button>
            </Link>
          </li>
        )}
      </ul>

      <div className="nav-actions">
        <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="euro">EUR</option>
          <option value="inr">INR</option>
        </select>

        {!isMobile && (
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      )}
      </div>

      <div
        className="hamburger"
        ref={buttonRef}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>
    </div>
  );
};

export default Navbar;
