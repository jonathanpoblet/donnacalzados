import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCategories from '../../components/HomeCategories/HomeCategories';
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
      <img className='home-img' src='../donnacalzados/assets/home/banner.png' alt='banner' data-aos='fade-up' data-aos-offset='100' data-aos-easing='ease-in-sine' data-aos-duration='600' />
      <HomeProducts />
      <HomeInfo />
      <HomeCategories />
      <HomeContact />
    </main>
  );
}
