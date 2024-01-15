import React from 'react';

import './homeBanner.css';

export default function HomeBanner() {
  return (
    <section className='home-banner'>
      <div className='home-banner-info'>
        <h1 className='home-banner-info-title'>Todos los modelos que estas buscando</h1>
        <h3 className='home-banner-info-subtitle'>Cuotas sin Interés</h3>
        <h3 className='home-banner-info-subtitle'>Envíos a todo el país</h3>
        <h3 className='home-banner-info-subtitle'>Variedad de modelos</h3>
        <h3 className='home-banner-info-subtitle'>Excelente precio y calidad</h3>
      </div>
      <img className='home-banner-img' src='../assets/home/banner-img.png' alt='banner' />
    </section>
  );
}
