import React from 'react';
import { SiMercadopago } from 'react-icons/si';
import { CiDeliveryTruck, CiCreditCard1 } from 'react-icons/ci';

import './HomeInfo.css';

export default function HomeInfo() {
  const info = [
    {
      logo: <CiCreditCard1 className='home-info-container-logo' />,
      title: 'Visa/Mastercard',
      text: 'Tarjeta de débito/crédito',
    },
    {
      logo: <SiMercadopago className='home-info-container-logo' />,
      title: 'Mercado Pago',
      text: 'Tarjeta de débito/crédito',
    },
    {
      logo: <CiDeliveryTruck className='home-info-container-logo' />,
      title: 'Envios a todo el pais',
      text: 'Correo argentino',
    },
  ];
  return (
    <section className='home-info'>
      {info.map((inf, index) => {
        return (
          <div className='home-info-container' key={index}>
            {inf.logo}
            <div className='home-info-container-texts'>
              <h5>{inf.title}</h5>
              <p>{inf.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
