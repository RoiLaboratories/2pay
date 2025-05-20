import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Footer } from "../components/headerandfooter";
import Hero from "../components/hero";
import Tierlist from "../components/tierlist";
import Cards from "../components/cards";
import Details from "../components/details";
import Faqs from "../components/FAQs";
// import Modal from "../components/modal";

const LandingPage = () => {
  return (
    <>
      <Header />

      <div id="home">
        <Hero />
      </div>

      <div id="tiers">
        <Tierlist />
      </div>

      <div id="how-it-works">
        <Cards howitworks="How it works" />
      </div>

      <Details />

      <div id="faqs">
        <Faqs />
      </div>

      <Footer />
      {/* <Modal /> */}
    </>
  );
};

export default LandingPage;
