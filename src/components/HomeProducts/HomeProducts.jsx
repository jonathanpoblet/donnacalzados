import React, { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './homeProducts.css';

export default function HomeProducts() {
  const formatPrice = number => {
    const formatNumber = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formatNumber;
  };
  useEffect(() => {
    AOS.init();
  }, []);
  const products = [
    {
      img: '../donnacalzados/assets/home/force.png',
      title: 'Air Force',
      price: 8000,
    },
    {
      img: '../donnacalzados/assets/home/converse2.png',
      title: 'Botitas Converse',
      price: 11000,
    },
    {
      img: '../donnacalzados/assets/home/ultraboost.png',
      title: 'Ultraboost',
      price: 9200,
    },
    {
      img: '../donnacalzados/assets/home/niza.png',
      title: 'Niza',
      price: 9200,
    },
    {
      img: '../donnacalzados/assets/home/puma.png',
      title: 'Puma XL',
      price: 10200,
    },
    {
      img: '../donnacalzados/assets/home/raizer.png',
      title: 'Raizer',
      price: 8500,
    },
    {
      img: '../donnacalzados/assets/home/force.png',
      title: 'Air Force',
      price: 8000,
    },
    {
      img: '../donnacalzados/assets/home/converse2.png',
      title: 'Botitas Converse',
      price: 11000,
    },
    {
      img: '../donnacalzados/assets/home/puma.png',
      title: 'Puma XL',
      price: 10200,
    },
    {
      img: '../donnacalzados/assets/home/raizer.png',
      title: 'Raizer',
      price: 8500,
    },
    {
      img: '../donnacalzados/assets/home/force.png',
      title: 'Air Force',
      price: 8000,
    },
    {
      img: '../donnacalzados/assets/home/converse2.png',
      title: 'Botitas Converse',
      price: 11000,
    },
  ];
  return (
    <section className='home-products' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
      <h2 className='home-products-title'>Descubrí nuestros calzados</h2>
      <div className='home-products-container'>
        {products.map((prod, index) => {
          return (
            <div className='home-products-container-card' key={index}>
              <img className='home-products-container-card-img' src={prod.img} alt='Producto' />
              <p className='home-products-container-card-title'>{prod.title}</p>
              <p className='home-products-container-card-price'>${formatPrice(prod.price)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
