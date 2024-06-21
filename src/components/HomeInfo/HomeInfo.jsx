import React, { useEffect } from 'react';
import { SiMercadopago } from 'react-icons/si';
import { CiDeliveryTruck, CiCreditCard1 } from 'react-icons/ci';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './homeInfo.css';

export default function HomeInfo() {
  useEffect(() => {
    AOS.init();
  }, []);
  const info = [
    {
      logo: <CiCreditCard1 className='home-info-container-logo' />,
      title: 'Visa/Mastercard',
      text: 'Tarjeta de débito/crédito',
    },
    {
      logo: <SiMercadopago className='home-info-container-logo' />,
      title: 'Mercado Pago',
      text: 'Dinero en cuenta',
    },
    {
      logo: <CiDeliveryTruck className='home-info-container-logo' />,
      title: 'Envios a todo el pais',
      text: 'Correo argentino',
    },
  ];
  return (
    <section className='home-info' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
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
