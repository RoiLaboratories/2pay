import React, { useState } from "react";
import "../css-files/landingPage.css";
import "../css-files/cards.css";
import { Link } from "react-router-dom";
import "../css-files/modal.css";

const Cards = ({ howitworks }) => {
  const [stepTier1, setStepTier1] = useState(0);
  const [stepTier2, setStepTier2] = useState(0);
  const [stepTier3, setStepTier3] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const addStep = (tier) => {
    switch (tier) {
      case 1:
        setStepTier1((prev) => (prev < 5 ? prev + 1 : 0));
        break;
      case 2:
        setStepTier2((prev) => (prev < 5 ? prev + 1 : 0));
        break;
      case 3:
        setStepTier3((prev) => (prev < 5 ? prev + 1 : 0));
        break;
      default:
        break;
    }
  };

  const getProgressWidth = (step) => `${(step / 5) * 100}%`;

  const openModal = (price) => {
    setSelectedPrice(price);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPrice(null);
  };

  return (
    <>
      <div
        className={`${modalOpen ? "open" : ""} modal-overlay`}
        onClick={closeModal}
        style={{ display: modalOpen ? "flex" : "none" }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">Contribute</h2>

          <div className="modal-box">
            <div className="modal-box-left">
              <div className="pay-section">
                <div className="label">Pay</div>
                <div className="pay-amount">
                  <span className="usdc-icon">💲</span>
                  <div>
                    <strong>{selectedPrice} USDC</strong>
                    <div className="subtext">${selectedPrice}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-box-right">
              <div className="label">Address</div>
              <div className="address-box">0x80eb...fb8e</div>
            </div>
          </div>

          <div className="modal-summary">
            <div className="row">
              <span>Network fee</span>
              <span>
                &lt;0.01 <span className="eth-icon">🧿</span> ETH
              </span>
            </div>
            <div className="row">
              <span>Total</span>
              <span>${selectedPrice}</span>
            </div>
          </div>

          <div className="modal-buttons">
            <button className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
            <button className="confirm-btn">Confirm</button>
          </div>
        </div>
      </div>

      <div className="cards__div">
        <div className="mainheading">
          <h1>{howitworks}</h1>
        </div>
        <div className="cards">
          <div className="card-1 box card">
            <div className="card__heading">Connect Wallet</div>
            <p className="card__body">Link your web3 wallet in seconds</p>
          </div>
          <div className="card-2 box card">
            <div className="card__heading">Choose Pools</div>
            <p className="card__body">
              Select from variety of contribution pools tier options and
              contribute.
            </p>
          </div>
          <div className="card-3 box card">
            <div className="card__heading">Earn and Claim</div>
            <p className="card__body">
              Watch your crypto grow and claim reward when the pool gets filled.
            </p>
          </div>
        </div>
      </div>

      <div className="contribute__div">
        <div className="mainheading">
          <h1>Contribute</h1>
        </div>
        <div className="cards">
          {/* TIER 1 */}
          <div className="card-1 box card">
            <div className="contribute__heading">
              Tier 1
              <div className="progress__bar" onClick={() => addStep(1)}>
                <div className="progress__num">
                  {stepTier1 < 5 ? stepTier1 : "Filled"}
                </div>
                <div
                  className="progress__indicator"
                  style={{ width: getProgressWidth(stepTier1) }}
                ></div>
              </div>
            </div>
            <p className="card__body">
              <div className="currency">USDC</div>
              <div className="price__value">$10</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(10)}
              >
                Contribute
              </button>
            </p>
          </div>

          {/* TIER 2 */}
          <div className="card-2 box card">
            <div className="contribute__heading">
              Tier 2
              <div className="progress__bar" onClick={() => addStep(2)}>
                <div className="progress__num">
                  {stepTier2 < 5 ? stepTier2 : "Filled"}
                </div>
                <div
                  className="progress__indicator"
                  style={{ width: getProgressWidth(stepTier2) }}
                ></div>
              </div>
            </div>
            <p className="card__body">
              <div className="currency">USDC</div>

              <div className="price__value">$50</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(50)}
              >
                Contribute
              </button>

              <div className="price__value">$50</div>
              <button className="btn blue contribute__btn">Contribute</button>

            </p>
          </div>

          {/* TIER 3 */}
          <div className="card-3 box card">
            <div className="contribute__heading">
              Tier 3
              <div className="progress__bar" onClick={() => addStep(3)}>
                <div className="progress__num">
                  {stepTier3 < 5 ? stepTier3 : "Filled"}
                </div>
                <div
                  className="progress__indicator"
                  style={{ width: getProgressWidth(stepTier3) }}
                ></div>
              </div>
            </div>
            <p className="card__body">
              <div className="currency">USDC</div>
              <div className="price__value">$500</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(500)}
              >
                Contribute
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
