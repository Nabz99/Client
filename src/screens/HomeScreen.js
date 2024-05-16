import React from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import Publicite from "./../components/homeComponents/Publicite";
import Realisation from "./../components/homeComponents/Realisation";
import AboutUs from "./../components/homeComponents/AboutUs";
import "./HomeScreen.css";


const HomeScreen = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header />
      <div className="button-container">
        <button className="nav-button" onClick={() => scrollToSection("shop-section")}>
          Produits
        </button>
        <button className="nav-button" onClick={() => scrollToSection("publicite")}>
          Nos Services
        </button>
        <button className="nav-button" onClick={() => scrollToSection("realisation")}>
          Nos Réalisations
        </button>
        <button className="nav-button" onClick={() => scrollToSection("about-us")}>
          À propos
        </button>
        <button className="nav-button" onClick={() => scrollToSection("contact-info")}>
          Contactez-Nous
        </button>
      </div>
      <ShopSection />
      <Publicite />
      <Realisation />
      <AboutUs />
      <ContactInfo />
    </div>
  );
};

export default HomeScreen;
