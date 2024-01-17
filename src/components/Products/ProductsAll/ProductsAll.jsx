import React from 'react';

import './productsAll.css';

export default function ProductsAll() {
  const formatPrice = number => {
    const formatNumber = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formatNumber;
  };
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
    <article className='products-all'>
      {products.map((prod, index) => {
        return (
          <div className='products-all-card' key={index}>
            <img className='products-all-card-img' src={prod.img} alt='Producto' />
            <p className='products-all-card-title'>{prod.title.toLocaleUpperCase()}</p>
            <p className='products-all-card-price'>${formatPrice(prod.price)}</p>
          </div>
        );
      })}
    </article>
  );
}
