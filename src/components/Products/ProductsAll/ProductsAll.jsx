import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDetail } from '../../../app/state/detailSlice';
import { formatPrice } from '../../../utils/formatPrice';

import './productsAll.css';

export default function ProductsAll({ products }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetail = prod => {
    dispatch(setDetail(prod));
    navigate(`./detalle?producto=${prod.id}`);
  };

  return (
    <article className='products-all'>
      {products.length !== 0 ? (
        products.map((prod, index) => (
          <div className='products-all-card' key={index}>
            <img className='products-all-card-img' src={prod.img} alt='Producto' onClick={() => handleDetail(prod)} />
            <p className='products-all-card-title'>{prod.model.toLocaleUpperCase()}</p>
            <p className='products-all-card-price'>
              <b>${formatPrice(prod.price)}</b>
            </p>
            <p className='products-all-card-price products-all-card-price2'>
              <b>3</b> cuotas sin interés <b>${formatPrice(prod.price / 3)}</b>
            </p>
            <button className='products-all-card-button'>AGREGAR AL CARRITO</button>
          </div>
        ))
      ) : (
        <p className='products-all-notfound'>No se encontraron productos con los filtros seleccionados</p>
      )}
    </article>
  );
}
