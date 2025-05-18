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
  const [transactionState, setTransactionState] = useState("idle"); // idle | loading | success | insufficient | networkError

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
    setTransactionState("idle");
  };

  const resetModal = () => {
    setModalOpen(false);
    setSelectedPrice(null);
    setTransactionState("idle");
  };

  const confirmTransaction = () => {
    setTransactionState("loading");

    setTimeout(() => {
      const rand = Math.random();

      if (rand < 0.6) {
        setTransactionState("success");
      } else if (rand < 0.8) {
        setTransactionState("insufficient");
      } else {
        setTransactionState("networkError");
      }
    }, 2000);
  };

  return (
    <>
      {/* Modal */}
      <div
        className={`${modalOpen ? "open" : ""} modal-overlay`}
        onClick={resetModal}
        style={{ display: modalOpen ? "flex" : "none" }}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Transaction State Views */}
          {transactionState === "loading" && (
            <div className="modal-feedback loading">
              <div className="spinner"></div>
              <p>Transaction Loading...</p>
            </div>
          )}

          {transactionState === "success" && (
            <div className="modal-feedback success">
              <p>✅ Transaction Complete</p>
              <small>
                You have successfully made a contribution to this pool.
              </small>
              <button className="btn blue" onClick={resetModal}>
                Close
              </button>
            </div>
          )}
          {transactionState === "insufficient" && (
            <div className="modal-feedback error">
              <p>❌ Transaction Failed</p>
              <small>
                You have insufficient balance to contribute to this pool.
              </small>
              <button className="btn blue" onClick={resetModal}>
                Close
              </button>
            </div>
          )}
          {transactionState === "networkError" && (
            <div className="modal-feedback error">
              <p>❌ Transaction Failed</p>
              <small>There was a network error. Please try again later.</small>
              <button className="btn blue" onClick={resetModal}>
                Close
              </button>
            </div>
          )}

          {transactionState === "idle" && (
            <>
              <h2 className="modal-title">Contribute</h2>

              <div className="modal-box">
                <div className="modal-box-left">
                  <div className="pay-section">
                    <div className="label">Pay</div>
                    <div className="pay-amount">
                      <span className="usdc-icon">
                        <img src="Frame521.png" alt="" />
                      </span>
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
                    <div className="eth-price">
                      &lt;0.01
                      <span className="eth-icon">
                        <img src="ethereum-eth-logo.png" alt="" />
                      </span>
                    </div>
                  </span>
                </div>
                <div className="row">
                  <span>Total</span>
                  <span>${selectedPrice}</span>
                </div>
              </div>

              <div className="modal-buttons">
                <button className="cancel-btn" onClick={resetModal}>
                  Cancel
                </button>
                <button className="confirm-btn" onClick={confirmTransaction}>
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="cards__div">
        <div className="mainheading">
          <h1>{howitworks}</h1>
        </div>
        <div className="cards">
          <div className="card-1 box card">
            <div className="card__heading">Connect Wallet</div>
            <div className="card__body">Link your web3 wallet in seconds</div>
          </div>
          <div className="card-2 box card">
            <div className="card__heading">Choose Pools</div>
            <div className="card__body">
              Select from a variety of contribution pool tier options and
              contribute.
            </div>
          </div>
          <div className="card-3 box card">
            <div className="card__heading">Earn and Claim</div>
            <div className="card__body">
              Watch your crypto grow and claim rewards when the pool gets
              filled.
            </div>
          </div>
        </div>
      </div>

      {/* Contribute Section */}
      <div className="contribute__div" id="contribute">
        <div className="mainheading">
          <h1>Contribute</h1>
        </div>
        <div className="cards">
          {/* Tier 1 */}
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
            <div className="card__body">
              <div className="currency">USDC</div>
              <div className="price__value">$50</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(50)}
              >
                Contribute
              </button>
            </div>
          </div>

          {/* Tier 2 */}
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
            <div className="card__body">
              <div className="currency">USDC</div>
              <div className="price__value">$200</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(200)}
              >
                Contribute
              </button>
            </div>
          </div>

          {/* Tier 3 */}
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
            <div className="card__body">
              <div className="currency">USDC</div>
              <div className="price__value">$500</div>
              <button
                className="btn blue contribute__btn"
                onClick={() => openModal(500)}
              >
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
