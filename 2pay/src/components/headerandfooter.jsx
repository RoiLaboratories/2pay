import React, { useState, useEffect } from "react";
import "../css-files/landingPage.css";
import "../css-files/headerandfooter.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { usePrivy } from "@privy-io/react-auth";

export const Header = () => {
  const [selectedSections, setSelectedSections] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);
  const { login, authenticated, user, logout } = usePrivy();

  const toggleWalletModal = () => {
    if (!authenticated) {
      login();
    } else {
      setDisconnectModalOpen(!disconnectModalOpen);
    }
  };

  const handleDisconnect = () => {
    logout();
    setDisconnectModalOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
      {(isMobileMenuOpen || disconnectModalOpen) && (
        <div
          className="black-overlay"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setDisconnectModalOpen(false);
          }}
        ></div>
      )}
      <header className="header">
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
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(section);
                  if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
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

          {/* Mobile Wallet Button */}
          <div className="mobile-wallet-button">
            <button className="btn blue" onClick={toggleWalletModal}>
              {authenticated && user?.wallet?.address
                ? user.wallet.address.slice(0, 6) +
                  "..." +
                  user.wallet.address.slice(-4)
                : "Connect Wallet"}
            </button>
          </div>
        </div>

        {/* Desktop Wallet Button */}
        {!isMobileMenuOpen && (
          <div className="utils desktop-only">
            <div className="selected-wallet">
              {authenticated && (
                <img src="/wallets/base logo 1.png" alt="Wallet" />
              )}
            </div>
            <button className="btn blue" onClick={toggleWalletModal}>
              {authenticated && user?.wallet?.address
                ? user.wallet.address.slice(0, 6) +
                  "..." +
                  user.wallet.address.slice(-4)
                : "Connect Wallet"}
            </button>

            {authenticated && (
              <div
                className={`discnt-wlt-modal ${
                  disconnectModalOpen ? "openmodal" : ""
                }`}
              >
                <ExitToAppIcon />
                <span onClick={handleDisconnect}>Disconnect Wallet</span>
              </div>
            )}
          </div>
        )}
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
