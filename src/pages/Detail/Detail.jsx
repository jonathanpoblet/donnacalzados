import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addToCart } from '../../app/state/cartSlice';
import Swal from 'sweetalert2';

import './detail.css';

export default function Detail() {
  const product = useSelector(state => state.detail.detail);
  const location = useLocation();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const formatPrice = number => {
    const formatNumber = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formatNumber;
  };

  const addProductToCart = () => {
    const size = document.getElementsByClassName('detail-active-size');
    if (size.length === 0) {
      Swal.fire({
        title: 'Debes seleccionar un talle',
        confirmButtonColor: '#E54787',
      });
      return;
    }
    if (!quantity || quantity < 1) {
      Swal.fire({
        title: 'La cantidad debe ser mayor a 1 unidad',
        confirmButtonColor: '#E54787',
      });
      return;
    }

    const newProduct = {
      ...product,
      selectedSize: size[0].value,
      idCartProduct: `${product.id}/${size[0].value}`,
      quantity: quantity,
    };
    dispatch(addToCart(newProduct));
  };

  const selectSize = e => {
    if (e.target.className === 'detail-body-info-sizes-buttons detail-active-size') return (e.target.className = 'detail-body-info-sizes-buttons');
    const sizes = document.getElementsByClassName('detail-body-info-sizes-buttons');

    const sizesArray = Array.from(sizes);

    sizesArray.forEach(size => {
      size.className = 'detail-body-info-sizes-buttons';
    });

    e.target.className = 'detail-body-info-sizes-buttons detail-active-size';
  };

  const addQuantity = () => {
    if (quantity === 99) {
      return Swal.fire({
        title: 'Cantidad máxima',
        confirmButtonColor: '#E54787',
      });
    }
    setQuantity(quantity + 1);
  };

  const restQuantity = () => {
    if (quantity === 1) {
      return Swal.fire({
        title: 'Cantidad mínima',
        confirmButtonColor: '#E54787',
      });
    }
    setQuantity(quantity - 1);
  };

  return (
    <main className='detail'>
      <section className='detail-header'>
        <Link className='detail-header-link' to='/'>
          Inicio
        </Link>
        <span className='detail-header-bar'>/</span>
        <Link className='detail-header-link' to='/productos'>
          Productos
        </Link>
        <span className='detail-header-bar'>/</span>
        <h1 className='detail-header-title'>{product.model}</h1>
      </section>
      <section className='detail-body'>
        <img className='detail-body-img' src={product.img} alt='Calzado' />
        <div className='detail-body-info'>
          <h2>{product.model}</h2>
          <p>
            $ {formatPrice(product.price)}
            <small className='mt-2'>
              {' '}
              (O hasta 3 cuotas sin interés de <b>${formatPrice(product.price / 3)}</b>)
            </small>
          </p>

          <label>Cantidad</label>
          <div className='detail-body-info-buttons'>
            <button onClick={() => restQuantity()} className='detail-body-info-actions'>
              -
            </button>
            <input id='detail-quantity' type='number' value={quantity} min={1} readOnly={true} />
            <button onClick={() => addQuantity()} className='detail-body-info-actions'>
              +
            </button>
          </div>
          <label>Talles</label>
          <div className='detail-body-info-sizes'>
            {product.size.map(s => {
              return (
                <button className='detail-body-info-sizes-buttons' value={s} onClick={e => selectSize(e)} key={s}>
                  {s}
                </button>
              );
            })}
          </div>
          <button onClick={() => addProductToCart()} className='detail-body-info-add'>
            AGREGAR AL CARRITO
          </button>
        </div>
      </section>
    </main>
  );
}
