import React, { useState } from "react";
import "../css-files/landingPage.css";
import "../css-files/cards.css";
import "../css-files/FAQs.css";
import { Link } from "react-router-dom";

const Faqs = () => {
  return (
    <div className="cards__div faqs">
      <div className="mainheading">
        <h1>FAQs</h1>
      </div>
      <div className="cards faqs__cards">
        <div className="card-1 box card">
          <div className="card__heading">Is my contribution secure?</div>
          <p className="card__body">
            Yes, our platform uses industry-standard security measures to ensure
            secure transactions.
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
            typically irreversible. Contact our support team for guidance{" "}
          </p>
        </div>
        <div className="card-3 box card">
          <div className="card__heading">Can I cancel my contribution?</div>
          <p className="card__body">
            Due to the nature of blockchain transactions, contributions are
            typically irreversible. Contact our support team for guidance{" "}
          </p>
        </div>
        <div className="card-3 box card">
          <div className="card__heading">Can I cancel my contribution?</div>
          <p className="card__body">
            Due to the nature of blockchain transactions, contributions are
            typically irreversible. Contact our support team for guidance{" "}
          </p>
        </div>
        <div className="card-3 box card">
          <div className="card__heading">Can I cancel my contribution?</div>
          <p className="card__body">
            Due to the nature of blockchain transactions, contributions are
            typically irreversible. Contact our support team for guidance{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
