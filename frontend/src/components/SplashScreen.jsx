import React from "react";
import logo from "../assets/logo.png";
import "../styles/SplashScreen.css"; 

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img src={logo} alt="BudgetGenie Logo" className="splash-logo" />
        <h1 className="splash-title">BudgetGenie</h1>
        <p className="splash-subtitle">Your Pocket Friend</p>
      </div>
      <footer className="splash-footer">
        Built by <span className="font-bold text-orange-500">MONTEJ</span>
      </footer>
    </div>
  );
};

export default SplashScreen;