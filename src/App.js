import React from "react";
import HeroBanner from "./components/HeroBanner";
import Advantages from "./components/Advantages";
import SafetyMonitoringSystem from "./components/SafetyMonitoringSystem";
import OurService from "./components/OurService";
import KeyFeatures from "./components/KeyFeatures";
import ServiceCards from "./components/ServiceCards";
import ContactUs from "./components/ContactUs";
import LatestNews from "./components/LatestNews";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <HeroBanner />
      <Advantages />
      <SafetyMonitoringSystem />
      <OurService />
      <KeyFeatures />
      <ServiceCards />
      <ContactUs />
      <LatestNews />
      <Footer />
    </div>
  );
};

export default App;