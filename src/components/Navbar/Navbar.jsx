import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

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

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <select onChange={handleCurrencyChange}>
        <option value="usd">USD</option>
        <option value="euro">EUR</option>
        <option value="inr">INR</option>
      </select>
    </div>
  );
};

export default Navbar;
