import React, { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './homeCategories.css';

export default function HomeCategories() {
  useEffect(() => {
    AOS.init();
  }, []);
  const categories = [
    {
      url: '../donnacalzados/assets/home/hombres.png',
      alt: 'Hombres',
    },
    {
      url: '../donnacalzados/assets/home/mujeres.png',
      alt: 'Mujeres',
    },
    {
      url: '../donnacalzados/assets/home/niños.png',
      alt: 'Niños',
    },
  ];
  return (
    <section className='home-categories' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
      {categories.map((cat, index) => {
        return <img className='home-categories-img' key={index} src={cat.url} alt={cat.alt} />;
      })}
    </section>
  );
}
