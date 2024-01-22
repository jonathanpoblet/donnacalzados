import React, { useEffect } from 'react';
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

  const handleDetail = prod => {
    dispatch(setDetail(prod));
    navigate(`/detalle?producto=${prod.id}&persona=${prod.person[0].toLocaleLowerCase()}`);
  };

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

  return (
    <section className='home-products' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
      <h2 className='home-products-title'>DESCUBRÍ NUESTROS CALZADOS</h2>
      <div className='home-products-container'>
        {homeProducts.map((prod, index) => {
          return (
            <div className='home-products-container-card' key={index} onClick={() => handleDetail(prod)}>
              <img className='home-products-container-card-img' src={prod.img} alt='Producto' />
              <p className='home-products-container-card-title'>{prod.title.toLocaleUpperCase()}</p>
              <p className='home-products-container-card-price'>${formatPrice(prod.price)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
