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
      img: '../assets/home/force.png',
      title: 'Air Force',
      price: 8000,
    },
    {
      img: '../assets/home/converse2.png',
      title: 'Botitas Converse',
      price: 11000,
    },
    {
      img: '../assets/home/ultraboost.png',
      title: 'Ultraboost',
      price: 9200,
    },
    {
      img: '../assets/home/niza.png',
      title: 'Niza',
      price: 9200,
    },
    {
      img: '../assets/home/puma.png',
      title: 'Puma XL',
      price: 10200,
    },
    {
      img: '../assets/home/raizer.png',
      title: 'Raizer',
      price: 8500,
    },
    {
      img: '../assets/home/force.png',
      title: 'Air Force',
      price: 8000,
    },
    {
      img: '../assets/home/converse2.png',
      title: 'Botitas Converse',
      price: 11000,
    },
    {
      img: '../assets/home/puma.png',
      title: 'Puma XL',
      price: 10200,
    },
    {
      img: '../assets/home/raizer.png',
      title: 'Raizer',
      price: 8500,
    },
    {
      img: '../assets/home/force.png',
      title: 'Air Force',
      price: 8000,
    },
    {
      img: '../assets/home/converse2.png',
      title: 'Botitas Converse',
      price: 11000,
    },
  ];
  return (
    <section className='home-products' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
      {products.map((prod, index) => {
        return (
          <div className='home-products-card' key={index}>
            <img className='home-products-card-img' src={prod.img} alt='Producto' />
            <p className='home-products-card-title'>{prod.title}</p>
            <p className='home-products-card-price'>${formatPrice(prod.price)}</p>
          </div>
        );
      })}
    </section>
  );
}
