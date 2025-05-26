import React, { useRef, useState, useEffect } from "react";
import "../css-files/landingPage.css";
import "../css-files/cards.css";
import "../css-files/FAQs.css";

const Faqs = () => {
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setShowArrow(container.scrollLeft < maxScrollLeft - 10);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = 320; // card width + gap
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll =
        Math.ceil((currentScroll + cardWidth) / cardWidth) * cardWidth;
      scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="cards__div faqs">
      <div className="mainheading">
        <h1>FAQs</h1>
      </div>

      <div className="faqs__scroll-container">
        <div
          className="cards faqs__cards"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="card-1 box card">
            <div className="card__heading">Is my contribution secure?</div>
            <div className="  card__body faqs__card--body">
              Yes, our platform uses industry-standard security measures to
              ensure secure transactions.
            </div>
          </div>

          <div className="card-2 box card">
            <div className="card__heading">How to track my contribution</div>
            <div className="  card__body faqs__card--body">
              You can track your contributions using blockchain explorers.
            </div>
          </div>

          <div className="card-3 box card">
            <div className="card__heading">Can I cancel my contribution?</div>
            <div className="  card__body faqs__card--body">
              Due to the nature of blockchain transactions, contributions are
              typically irreversible. Contact our support team for guidance.
            </div>
          </div>

          <div className="card-4 box card">
            <div className="card__heading">When do I get payouts?</div>
            <div className="  card__body faqs__card--body">
              When a pool fills, payouts are automatically made by our smart
              contracts.
            </div>
          </div>

          <div className="card-5 box card">
            <div className="card__heading">What wallets are supported?</div>
            <div className="  card__body faqs__card--body">
              All EVM compatible chain wallets are supported.
            </div>
          </div>

          <div className="card-6 box card">
            <div className="card__heading">How does the platform work?</div>
            <div className="  card__body faqs__card--body">
              The platform works on a FIFO (First-in-First-Out) basis.
            </div>
          </div>
        </div>

        {showArrow && (
          <button
            className="scroll-arrow"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            ➜
          </button>
        )}
      </div>
    </div>
  );
};

export default Faqs;
