import React, { useState } from "react";
import "../css-files/landingPage.css";
import "../css-files/headerandfooter.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link } from "react-router-dom";

import { useEffect } from "react";

export const Header = () => {
  const [selectedSections, setSelectedSections] = useState(null);
  const [modalWalletOpen, setModalWalletOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [disconnectWallet, setDisconnectWallet] = useState(false);

  const toggleWalletModal = () => {
    setModalWalletOpen(!modalWalletOpen);
  };

  const handleSelectedWallet = (selectedWallet) => {
    setSelectedWallet(selectedWallet);
    setModalWalletOpen(!modalWalletOpen);
  };

  const walletEmojis = {
    metamask: "/wallets/image1.png",
    phantom: "/wallets/image 3.png",
    nest: "/wallets/image 4.png",
    coinbase: "/wallets/image 2.png",
    roi: "/wallets/roilogo.png",
    walletconnect: "/wallets/image 6.png",
  };

  const toggleDscntWallet = () => {
    setDisconnectWallet(!disconnectWallet);
    console.log(disconnectWallet);
  };

  useEffect(() => {
    const sectionIds = ["home", "tiers", "how-it-works", "contribute", "faqs"];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSelectedSections(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <header className="header">
        {(modalWalletOpen || disconnectWallet) && (
          <div
            className="black-overlay"
            onClick={() => {
              setModalWalletOpen(false);
              setDisconnectWallet(false);
            }}
          ></div>
        )}

        <div className="header__logo">
          <a href="/">
            <img src="2paylogo.png" alt="2Pay Logo" />
          </a>
        </div>

        <div className="header__sections">
          <a
            href="#home"
            onClick={() => setSelectedSections("home")}
            style={{
              color: selectedSections === "home" ? "#036de5" : "#ffffff",
            }}
          >
            <h3>Home</h3>
          </a>
          <a
            href="#tiers"
            onClick={() => setSelectedSections("tiers")}
            style={{
              color: selectedSections === "tiers" ? "#036de5" : "#ffffff",
            }}
          >
            <h3>Tiers</h3>
          </a>
          <a
            href="#how-it-works"
            onClick={() => setSelectedSections("how-it-works")}
            style={{
              color:
                selectedSections === "how-it-works" ? "#036de5" : "#ffffff",
            }}
          >
            <h3>How it works</h3>
          </a>
          <a
            href="#contribute"
            onClick={() => setSelectedSections("contribute")}
            style={{
              color: selectedSections === "contribute" ? "#036de5" : "#ffffff",
            }}
          >
            <h3>Contribute</h3>
          </a>
          <a
            href="#faqs"
            onClick={() => setSelectedSections("faqs")}
            style={{
              color: selectedSections === "faqs" ? "#036de5" : "#ffffff",
            }}
          >
            <h3>FAQs</h3>
          </a>
        </div>

        <div className="utils">
          <img
            className="gear"
            src="setting-2.png"
            alt=""
            onClick={() => {
              if (selectedWallet) {
                toggleDscntWallet();
              }
            }}
          />

          <div
            className={`${
              disconnectWallet ? "openmodal" : ""
            } discnt-wlt-modal`}
            onClick={() => {
              setSelectedWallet(null);
              setDisconnectWallet(false);
            }}
          >
            <ExitToAppIcon></ExitToAppIcon>
            Disconnect Wallet
          </div>

          <div className="selected-wallet">
            {selectedWallet && <img src="/wallets/base logo 1.png" alt="" />}
          </div>

          <button className="btn blue" onClick={toggleWalletModal}>
            {(selectedWallet && "0x80eb...fb8e") || "Connect Wallet"}
          </button>
        </div>

        <div className={`${modalWalletOpen ? "open" : ""} header__modal`}>
          <h3 className="header__modal--heading">Connect Wallet</h3>
          <div className="header__modal--installed">
            <h6>Installed</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("metamask")}
            >
              <div className="wallet__icon">
                <img src="/wallets/image1.png" alt="" />
              </div>
              <h5>MetaMask</h5>
            </div>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("phantom")}
            >
              <div className="wallet__icon">
                <img src="/wallets/image 3.png" alt="" />
              </div>
              <h5>Phantom</h5>
            </div>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("nest")}
            >
              <div className="wallet__icon">
                <img src="/wallets/image 4.png" alt="" />
              </div>
              <h5>Nest Wallet</h5>
            </div>
          </div>
          <div className="header__modal--Recommended">
            <h6>Recommended</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("coinbase")}
            >
              <div className="wallet__icon">
                <img src="/wallets/image 2.png" alt="" />
              </div>
              <h5>Coinbase</h5>
            </div>
            <div className="wallet" onClick={() => handleSelectedWallet("roi")}>
              <div className="wallet__icon">
                <img src="/wallets/roilogo.png" alt="" />
              </div>
              <h5>RoiWallet</h5>
            </div>
          </div>
          <div className="header__modal--Others">
            <h6>Others</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("walletconnect")}
            >
              <div className="wallet__icon">
                <img src="/wallets/image 6.png" alt="" />
              </div>
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
        <div className="socials">
          <a href="https://x.com/2paypool?s=21&t=zHzGDr4e_VCU86KYiKvL6g">
            {" "}
            <img src="/socials/Vector (2).png" alt="X" />
          </a>

          <a href="https://t.me/+dmGC8f7w_XU4MTA0">
            {" "}
            <img src="/socials/Vector-1.png" alt="" />
          </a>

          <a href="https://youtube.com/@2paypool?si=P2Yi3ICiSwNJor6B">
            {" "}
            <img src="/socials/Vector-2.png" alt="" />
          </a>
        </div>
      </footer>
    </>
  );
};
