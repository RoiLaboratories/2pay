import React, { useState } from "react";
import "../css files/landingPage.css";
import "../css files/hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className="hero__text">
          <h1 className="hero__text--h1">
            {" "}
            Earn Big By Being First <br /> <span> Be First, </span> Earn More
          </h1>

          <p className="hero__text--p">
            Maximize your earnings with secure, high-yield contributions. Claim
            your reward anytime and hassle-free.
          </p>
        </div>

        <div className="hero__image">
          <img src="image_fx__1_-removebg-preview 1.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Hero;
