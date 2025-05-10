import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Footer } from "../components/headerandfooter";
import Hero from "../components/hero";
import Tierlist from "../components/tierlist";

const LandingPage = () => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Tierlist></Tierlist>
    </>
  );
};

export default LandingPage;
