import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './homeCategories.css';

export default function HomeCategories() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const categories = [
    {
      url: '../donnacalzados/assets/home/hombres.png',
      alt: 'Hombres',
      page: './productos?p=hombre',
    },
    {
      url: '../donnacalzados/assets/home/mujeres.png',
      alt: 'Mujeres',
      page: './productos?p=mujer',
    },
    {
      url: '../donnacalzados/assets/home/niños.png',
      alt: 'Niños',
      page: './productos?p=niño',
    },
  ];
  return (
    <section className='home-categories' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
      {categories.map((cat, index) => {
        return <img onClick={() => navigate(`${cat.page}`)} className='home-categories-img' key={index} src={cat.url} alt={cat.alt} />;
      })}
    </section>
  );
}
