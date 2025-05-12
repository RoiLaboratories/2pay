import React, { useState } from "react";
import "../css files/landingPage.css";
import "../css files/headerandfooter.css";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logoandsection">
          <div className="header__logo">
            {" "}
            <img src="2paylogo.png" alt="" />
          </div>

          <div className="header__sections">
            <h3>Home</h3>
            <h3>Tiers</h3>
            <h3>How it works</h3>
            <h3>Contribute</h3>
            <h3>FAQS</h3>
          </div>
        </div>

        <div className="utils">
          <img className="gear" src="setting-2.png" alt="" />

          <button className="btn blue">Connect Wallet</button>
        </div>
      </header>
    </>
  );
};

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        {" "}
        <div> Copyright &copy; 2025, 2Pay</div>{" "}
        <img src="Frame 237.png" alt="" />
      </footer>
    </>
  );
};
