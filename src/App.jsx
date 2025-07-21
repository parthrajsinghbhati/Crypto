import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Coin from "./pages/Coin/Coin";
import Footer from "./components/Footer/Footer";
import { Compare } from "./pages/Compare/Compare";
import { Portfolio } from "./pages/Portfolio/Portfolio";
import { About } from "./pages/About/About";
import { Login } from "./pages/Login/Login";
import Chatbot from "./components/Chatbot/Chatbot";

const App = () => {
  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-[#2b2e4a] via-[#4b6cb7] to-[#182848]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/compare" element={<div><Compare /></div>} />
        <Route path="/portfolio" element={<div><Portfolio/></div>} />
        <Route path="/about" element={<div><About/></div>} />
        <Route path="/login" element={<div><Login/></div>} />
      </Routes>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
