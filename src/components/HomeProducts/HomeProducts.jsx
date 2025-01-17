import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductModal from '../Products/ProductsModal/ProductModal';
import Button from 'react-bootstrap/Button';

import AOS from 'aos';
import { getHomeProducts } from '../../app/state/productsSlice';
import Spinner from '../Spinner/Spinner';
import 'aos/dist/aos.css';
import './homeProducts.css';

export default function HomeProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(state => state.products.homeProducts);
  const loading = useSelector(state => state.products.loading);

  const [productsToShow, setProductsToShow] = useState(8);

  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState({});

  const handleDetail = prod => {
    navigate(`./productos/detalle?producto=${prod.id_product}`);
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
    let maxProductsToShow = 6;

    if (screenWidth < 1220) {
      maxProductsToShow = 6;
    }

    if (screenWidth < 500) {
      maxProductsToShow = 8;
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

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getHomeProducts());
    }
  }, [dispatch, products]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ProductModal product={product} show={modalShow} onHide={() => setModalShow(false)} />

      <section
        className='home-products'
        data-aos='fade-up'
        data-aos-offset='200'
        data-aos-easing='ease-in-sine'
        data-aos-duration='600'
      >
        <h2 className='home-products-title'>DESCUBRÍ NUESTROS CALZADOS</h2>
        <div className='home-products-container'>
          {products &&
            products.slice(0, productsToShow).map((prod, index) => (
              <div className='home-products-container-card' key={index}>
                <img
                  className='home-products-container-card-img'
                  src={prod.products[0].img}
                  alt='Producto'
                  onClick={() => handleDetail(prod)}
                />
                <p className='home-products-container-card-title'>
                  {prod.model.toLocaleUpperCase()}
                </p>
                <p className='home-products-container-card-price'>
                  <b>${formatPrice(prod.price)}</b>
                </p>{' '}
                <p className='home-products-container-card-price home-products-container-card-price2'>
                  <b>3</b> cuotas sin interés <b>${formatPrice(prod.price / 3)}</b>
                </p>
                <Button
                  className='home-products-container-card-button'
                  onClick={() => {
                    setProduct({ ...prod, quantity: 1 });
                    setModalShow(true);
                  }}
                >
                  AGREGAR AL CARRITO
                </Button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
