import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <form className="search-form">
        <input type="text" placeholder="Search crypto..." />
        <button type="submit">Search</button>
      </form>
      <select>
        <option value="usd">USD</option>
        <option value="euro">EUR</option>
        <option value="inr">INR</option>
      </select>
    </div>
  );
};

export default Navbar;
