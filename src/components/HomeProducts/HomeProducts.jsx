import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { homeProducts } from '../../test/homeProducts';
import { setDetail } from '../../app/state/detailSlice';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './homeProducts.css';

export default function HomeProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productsToShow, setProductsToShow] = useState(8);

  const handleDetail = prod => {
    dispatch(setDetail(prod));
    navigate(`./detalle?producto=${prod.id}`);
  };

  const formatPrice = number => {
    const formatNumber = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formatNumber;
  };

  const updateProductsToShow = () => {
    const screenWidth = window.innerWidth;
    let maxProductsToShow = 8;

    if (screenWidth < 1220) {
      maxProductsToShow = 6;
    }

    setProductsToShow(maxProductsToShow);
  };

  useEffect(() => {
    AOS.init();

    updateProductsToShow();

    window.addEventListener('resize', updateProductsToShow);

    return () => {
      window.removeEventListener('resize', updateProductsToShow);
    };
  }, []);

  return (
    <section className='home-products' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
      <h2 className='home-products-title'>DESCUBRÍ NUESTROS CALZADOS</h2>
      <div className='home-products-container'>
        {homeProducts.slice(0, productsToShow).map((prod, index) => (
          <div className='home-products-container-card' key={index}>
            <img className='home-products-container-card-img' src={prod.img} alt='Producto' onClick={() => handleDetail(prod)} />
            <p className='home-products-container-card-title'>{prod.title.toLocaleUpperCase()}</p>
            <p className='home-products-container-card-price'>
              <b>${formatPrice(prod.price)}</b>
            </p>
            <p className='home-products-container-card-price home-products-container-card-price2'>
              <b>3</b> cuotas sin interés <b>${formatPrice(prod.price / 3)}</b>
            </p>
            <button className='home-products-container-card-button'>AGREGAR AL CARRITO</button>
          </div>
        ))}
      </div>
    </section>
  );
}
