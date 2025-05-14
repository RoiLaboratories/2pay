import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Footer } from "../components/headerandfooter";
import Hero from "../components/hero";
import Tierlist from "../components/tierlist";
import Cards from "../components/cards";
import Details from "../components/details";
import Faqs from "../components/FAQs";
import Modal from "../components/modal";

const LandingPage = () => {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <Tierlist></Tierlist>
      <Cards howitworks="How it works" />
      <Details></Details>
      <Faqs></Faqs>
      <Footer></Footer>
      {/* <Modal></Modal> */}
    </>
  );
};

export default LandingPage;
