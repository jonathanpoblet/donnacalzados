import React, { useEffect, useState } from 'react';
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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const handleImageLoad = () => {
    // La imagen se ha cargado completamente, ocultar el spinner
    setImageLoaded(true);
  };

  return (
    <main className='home'>
      {!imageLoaded && <Spinner />} {/* Mostrar el spinner mientras la imagen no se haya cargado */}
      <img
        className={`home-img ${imageLoaded ? 'loaded' : ''}`}
        src='../donnacalzados/assets/home/banner.png'
        alt='banner'
        data-aos='fade-up'
        data-aos-offset='100'
        data-aos-easing='ease-in-sine'
        data-aos-duration='600'
        onLoad={handleImageLoad} // Evento onLoad para detectar la carga completa de la imagen
      />
      <HomeProducts />
      <HomeInfo />
      <HomeCategories />
      <HomeContact />
    </main>
  );
}

const Spinner = () => <div className='spinner'>Cargando...</div>;
