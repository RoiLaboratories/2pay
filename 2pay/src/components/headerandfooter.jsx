import React, { useState, useEffect } from "react";
import "../css-files/landingPage.css";
import "../css-files/headerandfooter.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { usePrivy } from "@privy-io/react-auth";

export const Header = () => {
  const [selectedSections, setSelectedSections] = useState(null);
  const [modalWalletOpen, setModalWalletOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [disconnectWallet, setDisconnectWallet] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { login, authenticated, user, logout } = usePrivy();

  const toggleWalletModal = () => {
    if (!authenticated) {
      login();
    }
    // If authenticated, do nothing on toggleWalletModal for now
  };

  const handleSelectedWallet = (wallet) => {
    setSelectedWallet(wallet);
    setModalWalletOpen(false);
  };

  const toggleDscntWallet = () => {
    setDisconnectWallet(!disconnectWallet);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Optional: you might not want to logout on mobile menu toggle
    // if (authenticated) {
    //   logout();
    // }
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
        {(modalWalletOpen || disconnectWallet || isMobileMenuOpen) && (
          <div
            className="black-overlay"
            onClick={() => {
              setModalWalletOpen(false);
              setDisconnectWallet(false);
              setIsMobileMenuOpen(false);
            }}
          ></div>
        )}

        <div className="header__logo">
          <a href="/">
            <img src="2paylogo.png" alt="2Pay Logo" />
          </a>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div
          className={`header__sections ${
            isMobileMenuOpen ? "mobile-open" : ""
          }`}
        >
          {["home", "tiers", "how-it-works", "contribute", "faqs"].map(
            (section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => {
                  setSelectedSections(section);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  color: selectedSections === section ? "#036de5" : "#ffffff",
                }}
              >
                <h3>
                  {section.charAt(0).toUpperCase() +
                    section.slice(1).replace(/-/g, " ")}
                </h3>
              </a>
            )
          )}

          {/* Utils inside menu */}
          <div className="utils">
            {selectedWallet && (
              <img
                className="gear"
                src="setting-2.png"
                alt="Settings"
                onClick={toggleDscntWallet}
              />
            )}

            <div
              className={`discnt-wlt-modal ${
                disconnectWallet ? "openmodal" : ""
              }`}
              onClick={() => {
                setSelectedWallet(null);
                setDisconnectWallet(false);
                logout();
              }}
            >
              <ExitToAppIcon />
              Disconnect Wallet
            </div>

            <div className="selected-wallet">
              {selectedWallet && (
                <img src="/wallets/base logo 1.png" alt="Selected Wallet" />
              )}
            </div>

            <button className="btn blue mobilebtn" onClick={toggleWalletModal}>
              {authenticated && user?.wallet?.address
                ? user.wallet.address.slice(0, 6) +
                  "..." +
                  user.wallet.address.slice(-4)
                : "Connect Wallet"}
            </button>
          </div>
        </div>

        {/* Desktop-only utils */}
        <div className="utils desktop-only">
          {selectedWallet && (
            <img
              className="gear"
              src="setting-2.png"
              alt="Settings"
              onClick={toggleDscntWallet}
            />
          )}

          <div
            className={`discnt-wlt-modal ${
              disconnectWallet ? "openmodal" : ""
            }`}
            onClick={() => {
              setSelectedWallet(null);
              setDisconnectWallet(false);
              logout();
            }}
          >
            <ExitToAppIcon />
            Disconnect Wallet
          </div>

          <div className="selected-wallet">
            {selectedWallet && (
              <img src="/wallets/base logo 1.png" alt="Selected Wallet" />
            )}
          </div>

          <button className="btn blue" onClick={toggleWalletModal}>
            {authenticated && user?.wallet?.address
              ? user.wallet.address.slice(0, 6) +
                "..." +
                user.wallet.address.slice(-4)
              : "Connect Wallet"}
          </button>
        </div>

        {/* Wallet connection modal */}
        <div className={`header__modal ${modalWalletOpen ? "open" : ""}`}>
          <h3 className="header__modal--heading">Connect Wallet</h3>

          <div className="header__modal--installed">
            <h6>Installed</h6>
            {["metamask", "phantom", "nest"].map((wallet) => (
              <div
                className="wallet"
                key={wallet}
                onClick={() => handleSelectedWallet(wallet)}
              >
                <div className="wallet__icon">
                  <img
                    src={`/wallets/image${
                      wallet === "nest"
                        ? " 4"
                        : wallet === "phantom"
                        ? " 3"
                        : "1"
                    }.png`}
                    alt={wallet}
                  />
                </div>
                <h5>{wallet.charAt(0).toUpperCase() + wallet.slice(1)}</h5>
              </div>
            ))}
          </div>

          <div className="header__modal--Recommended">
            <h6>Recommended</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("coinbase")}
            >
              <div className="wallet__icon">
                <img src="/wallets/image 2.png" alt="Coinbase" />
              </div>
              <h5>Coinbase</h5>
            </div>
          </div>

          <div className="header__modal--Others">
            <h6>Others</h6>
            <div
              className="wallet"
              onClick={() => handleSelectedWallet("walletconnect")}
            >
              <div className="wallet__icon">
                <img src="/wallets/image 6.png" alt="Wallet Connect" />
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
        <div>Copyright &copy; 2025, 2Pay</div>
        <div className="socials">
          <a
            href="https://x.com/2paypool?s=21&t=zHzGDr4e_VCU86KYiKvL6g"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/socials/Vector (2).png" alt="X" />
          </a>

          <a
            href="https://t.me/+dmGC8f7w_XU4MTA0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/socials/Vector-1.png" alt="Telegram" />
          </a>

          <a
            href="https://youtube.com/@2paypool?si=P2Yi3ICiSwNJor6B"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/socials/Vector-2.png" alt="YouTube" />
          </a>
        </div>
      </footer>
    </>
  );
};
