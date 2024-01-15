import React from 'react';
import './homeCategories.css';

export default function HomeCategories() {
  const categories = [
    {
      url: '../assets/home/hombres.png',
      alt: 'Hombres',
    },
    {
      url: '../assets/home/mujeres.png',
      alt: 'Mujeres',
    },
    {
      url: '../assets/home/niños.png',
      alt: 'Niños',
    },
  ];
  return (
    <section className='home-categories'>
      {categories.map((cat, index) => {
        return <img className='home-categories-img' key={index} src={cat.url} alt={cat.alt} />;
      })}
    </section>
  );
}
