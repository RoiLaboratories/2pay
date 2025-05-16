import React, { useRef, useState, useEffect } from "react";
import "../css-files/landingPage.css";
import "../css-files/cards.css";
import "../css-files/FAQs.css";

const Faqs = () => {
  const scrollRef = useRef(null);
  const [showArrow, setShowArrow] = useState(true);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    setShowArrow(container.scrollLeft < maxScrollLeft - 10); // add small buffer
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // check on load and when scrolling
    checkScroll();
    container.addEventListener("scroll", checkScroll);

    // clean up
    return () => {
      container.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div className="cards__div faqs">
      <div className="mainheading">
        <h1>FAQs</h1>
      </div>

      <div className="faqs__scroll-container">
        <div className="cards faqs__cards" ref={scrollRef}>
          <div className="card-1 box card">
            <div className="card__heading">Is my contribution secure?</div>
            <p className="card__body">
              Yes, our platform uses industry-standard security measures to
              ensure secure transactions.
            </p>
          </div>
          <div className="card-2 box card">
            <div className="card__heading">How to track my contribution</div>
            <p className="card__body">
              You can track your contributions using blockchain explorers.
            </p>
          </div>
          <div className="card-3 box card">
            <div className="card__heading">Can I cancel my contribution?</div>
            <p className="card__body">
              Due to the nature of blockchain transactions, contributions are
              typically irreversible. Contact our support team for guidance.
            </p>
          </div>
          <div className="card-4 box card">
            <div className="card__heading">Can I cancel my contribution?</div>
            <p className="card__body">
              Due to the nature of blockchain transactions, contributions are
              typically irreversible. Contact our support team for guidance.
            </p>
          </div>{" "}
          <div className="card-5 box card">
            <div className="card__heading">Can I cancel my contribution?</div>
            <p className="card__body">
              Due to the nature of blockchain transactions, contributions are
              typically irreversible. Contact our support team for guidance.
            </p>
          </div>{" "}
          <div className="card-6 box card">
            <div className="card__heading">Can I cancel my contribution?</div>
            <p className="card__body">
              Due to the nature of blockchain transactions, contributions are
              typically irreversible. Contact our support team for guidance.
            </p>
          </div>
        </div>

        {showArrow && (
          <button className="scroll-arrow" onClick={scrollRight}>
            ➜
          </button>
        )}
      </div>
    </div>
  );
};

export default Faqs;
