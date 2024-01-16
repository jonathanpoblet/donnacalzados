import React, { useEffect } from 'react';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import HomeCategories from '../../components/HomeCategories/HomeCategories';
import HomeContact from '../../components/HomeContact/HomeContact';
import HomeInfo from '../../components/HomeInfo/HomeInfo';
import HomeProducts from '../../components/HomeProducts/HomeProducts';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './home.css';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <main className='home'>
      {/* <HomeBanner /> */}
      <img className='home-img' src='../assets/home/banner-copia.png' alt='banner' data-aos='fade-up' data-aos-offset='100' data-aos-easing='ease-in-sine' data-aos-duration='600' />
      <h2 className='home-title' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
        Descubrí nuestros calzados
      </h2>
      <HomeProducts />
      <button className='btn btn-dark home-products-button'>MOSTRAR MÁS PRODUCTOS</button>
      <HomeInfo />
      <HomeCategories />
      <HomeContact />
    </main>
  );
}
