// src/components/Navbar.js
import React from 'react';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Margarita</div>
      <ul className="navbar-links">
        <li><a href="#home">Inicio</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
