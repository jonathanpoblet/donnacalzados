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
      <HomeProducts />
      <button onClick={() => navigate('/productos')} className='btn btn-dark home-products-button'>
        MOSTRAR MÁS PRODUCTOS
      </button>
      <HomeInfo />
      <HomeContact />
    </main>
  );
}
