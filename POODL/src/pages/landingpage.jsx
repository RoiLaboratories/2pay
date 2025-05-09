import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Footer } from "../components/headerandfooter";
import Hero from "../components/hero";

const LandingPage = () => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
    </>
  );
};

export default LandingPage;
