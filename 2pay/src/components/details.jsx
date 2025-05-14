import React, { useState } from "react";
import "../css-files/landingPage.css";
import "../css-files/hero.css";
import "../css-files/details.css";

import { Link } from "react-router-dom";

const Details = () => {
  return (
    <>
      <div className="hero">
        <div>
          <div className="hero__text">
            <h1 className="hero__text--blue"> Earn Big By Being First </h1>

            <p className="hero__text--p">
              No waiting. No delays. Claim your reward, as soon as a pool hits 5
              users, rewards are sent.
            </p>
          </div>

          <div className="hero__text">
            <h1 className="hero__text--blue"> Contributions Made Simple </h1>

            <p className="hero__text--p">
              Join contribution pools and get rewarded instantly.
            </p>
          </div>

          <div className="hero__text">
            <h1 className="hero__text--blue"> On-Chain Stats </h1>

            <p className="hero__text--p">
              Track every pool in real time on the blockchain.{" "}
            </p>
          </div>
        </div>

        <div className="hero__image2">
          <img src="image_fx-removebg-preview 1.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Details;
