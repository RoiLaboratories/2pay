import React, { useState } from "react";
import "../css files/landingPage.css";
import "../css files/cards.css";
import { Link } from "react-router-dom";

const Cards = ({ howitworks }) => {
  const [stepTier1, setStepTier1] = useState(0);
  const [stepTier2, setStepTier2] = useState(0);
  const [stepTier3, setStepTier3] = useState(0);

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

  return (
    <>
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
              <div className="price__value">$50</div>
              <button className="btn blue contribute__btn">Contribute</button>
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
              <div className="price__value">$200</div>
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
              <button className="btn blue contribute__btn">Contribute</button>
            </p>
          </div>
        </div>

        {/* <div className="stats">
          <div className="stats__value">
            <div className="stats__value--number">18.745k</div>
            <div className="stats__value--description">Total Contributors</div>
          </div>
          <div className="stats__value">
            <div className="stats__value--number">$432k</div>
            <div className="stats__value--description">
              Total USDC Processed
            </div>
          </div>{" "}
          <div className="stats__value">
            <div className="stats__value--number">$164k</div>
            <div className="stats__value--description">Payouts Made</div>
          </div>{" "}
          <div className="stats__value">
            <div className="stats__value--number">92k</div>
            <div className="stats__value--description">Active Pools</div>
          </div>{" "}
        </div> */}
      </div>
    </>
  );
};

export default Cards;
