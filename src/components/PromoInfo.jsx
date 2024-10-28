// src/components/PromoInfo.js
import React from 'react';
import '../styles/PromoInfo.css';

const PromoInfo = () => {
  return (
    <section className="promo-info">
      <h2>Detalles de la Promoción</h2>
      <p>Participa registrando los códigos en los empaques. ¡Podrías ganar premios en efectivo!</p>
      <ul>
        <li>Premios diarios de $10,000</li>
        <li>Premio semanal de $1,000,000</li>
      </ul>
    </section>
  );
};

export default PromoInfo;
