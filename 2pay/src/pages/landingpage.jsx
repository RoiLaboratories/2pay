import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Footer } from "../components/headerandfooter";
import Hero from "../components/hero";
import Tierlist from "../components/tierlist";
import Cards from "../components/cards";

const LandingPage = () => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Tierlist></Tierlist>
      <Cards howitworks="How it works" />
    </>
  );
};

export default LandingPage;
