import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeContact from '../../components/HomeContact/HomeContact';
import HomeInfo from '../../components/HomeInfo/HomeInfo';
import HomeProducts from '../../components/HomeProducts/HomeProducts';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './home.css';

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <main className='home'>
      {/* <HomeBanner /> */}
      {/* <img className='home-img' src='../donnacalzados/assets/home/banner.png' alt='banner' data-aos='fade-up' data-aos-offset='100' data-aos-easing='ease-in-sine' data-aos-duration='600' /> */}
      <HomeProducts />
      <button onClick={() => navigate('/productos')} className='btn btn-dark home-products-button'>
        MOSTRAR MÁS PRODUCTOS
      </button>
      <HomeInfo />
      <HomeContact />
    </main>
  );
}
