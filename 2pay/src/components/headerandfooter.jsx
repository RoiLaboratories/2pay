import React, { useState } from "react";
import "../css-files/landingPage.css";
import "../css-files/headerandfooter.css";

import { Link } from "react-router-dom";

export const Header = () => {
  const [modalWalletOpen, setModalWalletOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const toggleWalletModal = () => {
    setModalWalletOpen(!modalWalletOpen);
  };

  const handleSelectedWallet = (selectedWallet) => {
    setSelectedWallet(selectedWallet);
    setModalWalletOpen(!modalWalletOpen);
  };

  const walletEmojis = {
    metamask: "🦊",
    phantom: "👻",
    nest: "🐦",
    coinbase: "💼",
    roi: "💨",
    walletconnect: "👛",
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          {" "}
          <img src="2paylogo.png" alt="" />
        </div>

        <div className="header__sections">
          <a href="#home">
            <h3>Home</h3>
          </a>
          <a href="#tiers">
            <h3>Tiers</h3>
          </a>
          <a href="#how-it-works">
            <h3>How it works</h3>
          </a>
          <a href="#contribute">
            <h3>Contribute</h3>
          </a>
          <a href="#faqs">
            <h3>FAQs</h3>
          </a>
        </div>

        <div className="utils">
          <img className="gear" src="setting-2.png" alt="" />

          <div className="selected-wallet">{walletEmojis[selectedWallet]}</div>

          <button className="btn blue" onClick={toggleWalletModal}>
            {(selectedWallet && "address") || "Connect Wallet"}
          </button>
        </div>

        <div className={`${modalWalletOpen ? "open" : ""} header__modal`}>
          {console.log(modalWalletOpen)}
          <h3 className="header__modal--heading">Connect Wallet</h3>
          <div className="header__modal--installed">
            <h6>Installed</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("metamask")}
            >
              <div className="wallet__icon">👜</div>
              <h5>MetaMask</h5>
            </div>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("phantom")}
            >
              <div className="wallet__icon">👜</div>
              <h5>Phantom</h5>
            </div>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("nest")}
            >
              <div className="wallet__icon">👜</div>
              <h5>Nest Wallet</h5>
            </div>
          </div>
          <div className="header__modal--Recommended">
            <h6>Recommended</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("coinbase")}
            >
              <div className="wallet__icon">👜</div>
              <h5>Coinbase</h5>
            </div>
            <div className="wallet" onClick={() => handleSelectedWallet("roi")}>
              <div className="wallet__icon">👜</div>
              <h5>RoiWallet</h5>
            </div>
          </div>
          <div className="header__modal--Others">
            <h6>Others</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("walletconnect")}
            >
              <div className="wallet__icon">👜</div>
              <h5>Wallet Connect</h5>
            </div>
          </div>
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
