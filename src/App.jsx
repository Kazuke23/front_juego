// src/App.js
import React from 'react';
import Navbar from './components/navbar';
import HeroSection from './components/HeroSection';
import PromoInfo from './components/PromoInfo';
import Footer from './components/Footer';
import './styles/App.css'


function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <PromoInfo />
      <Footer />
    </div>
  );
}

export default App;
