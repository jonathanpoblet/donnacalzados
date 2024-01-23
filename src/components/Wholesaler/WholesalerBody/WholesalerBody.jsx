import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';

import './wholesalerBody.css';

export default function WholesalerBody() {
  return (
    <section className='wholesaler-body'>
      <img onClick={() => window.open('https://wa.me/1150460184', '_blank')} src='../assets/wholesales/banner.png' alt='Compras Mayoristas' />
    </section>
  );
}
