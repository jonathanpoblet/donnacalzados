import React from 'react';
import './HomeProducts.css';

export default function HomeProducts() {
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
      img: '../assets/home/forum.png',
      title: 'Forum',
      price: 15000,
    },
    {
      img: '../assets/home/retro.png',
      title: 'Retro 4',
      price: 17300,
    },
    {
      img: '../assets/home/converse.png',
      title: 'Botitas Converse',
      price: 9000,
    },
    {
      img: '../assets/home/benito.png',
      title: 'Benito',
      price: 23000,
    },
  ];
  return (
    <section className='home-products'>
      {products.map((prod, index) => {
        return (
          <div className='home-products-card' key={index}>
            <img className='home-products-card-img' src={prod.img} alt='Producto' />
            <p className='home-products-card-title'>{prod.title}</p>
            <p className='home-products-card-price'>{prod.price}</p>
          </div>
        );
      })}
    </section>
  );
}
