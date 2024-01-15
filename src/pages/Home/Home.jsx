import React from 'react';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import HomeCategories from '../../components/HomeCategories/HomeCategories';
import HomeInfo from '../../components/HomeInfo/HomeInfo';
import HomeProducts from '../../components/HomeProducts/HomeProducts';
import './home.css';

export default function Home() {
  return (
    <main className='home'>
      {/* <HomeBanner /> */}
      <img className='home-img' src='../assets/home/banner.png' alt='banner' />
      <h2 className='home-title'>Descubrí nuestros calzados</h2>
      <HomeProducts />
      <button className='btn btn-dark home-products-button'>MOSTRAR MÁS PRODUCTOS</button>
      <HomeInfo />
      <HomeCategories />
    </main>
  );
}
