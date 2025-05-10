import React, { useState } from "react";
import "../css files/landingPage.css";
import "../css files/tierlist.css";
import { Link } from "react-router-dom";

const Tierlist = () => {
  return (
    <>
      <div className="tierlist">
        <div className="tier__1 box">
          <div className="box__heading">
            <img src="Vector.png" alt="" />
            <h1>Tier 1</h1>
          </div>

          <div className="box__body">
            <p>$50 Contribution</p>
            <p>5 Total Contributors </p>
            <p>First Gets: $100</p>
            <p>Platform Gets: $100</p>
            <p> Pool Fills Fast</p>
          </div>

          <button className="btn blue box__btn">Join Tier</button>
        </div>
        <div className="tier__2 box">
          <div className="box__heading">
            <img src="garden_relationshape-message-26.png" alt="" />
            <h1>Tier 2</h1>
          </div>

          <div className="box__body">
            <p>$200 Contribution</p>
            <p>5 Total Contributors </p>
            <p>First Gets: $400</p>
            <p>Platform Gets: $400</p>
            <p>Balanced Growth</p>
          </div>

          <button className="btn blue box__btn">Join Tier</button>
        </div>
        <div className="tier__3 box">
          <div className="box__heading">
            <img src="garden_relationshape-talk-26.png" alt="" />
            <h1>Tier 3</h1>
          </div>

          <div className="box__body">
            <p>$50 Contribution</p>
            <p>5 Total Contributors </p>
            <p>First Gets: $100</p>
            <p>Platform Gets: $100</p>
            <p> Pool Fills Fast</p>
          </div>

          <button className="btn blue box__btn">Join Tier</button>
        </div>
      </div>
    </>
  );
};

export default Tierlist;
