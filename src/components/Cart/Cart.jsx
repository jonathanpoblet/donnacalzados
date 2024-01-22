import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

import './cart.css';
import { addQuantity, deleteProduct, restQuantity } from '../../app/state/cartSlice';
import Swal from 'sweetalert2';

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const formatPrice = number => {
    const formatNumber = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formatNumber;
  };

  useEffect(() => {
    let tempTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      tempTotal += cart[i].quantity * cart[i].price;
    }
    console.log(tempTotal);
    setTotal(tempTotal);
  }, [cart]);

  return (
    <div className='offcanvas offcanvas-start' tabIndex='-1' id='offcanvasExample' aria-labelledby='offcanvasExampleLabel'>
      <div className='offcanvas-header'>
        <h5 className='offcanvas-title' id='offcanvasExampleLabel'>
          Carrito
        </h5>
        <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
      </div>
      <div className='offcanvas-body'>
        {cart.length !== 0 ? (
          cart.map(c => {
            return (
              <div className='offcanvas-body-container' key={`${c.id}/${c.selectedSize}`}>
                <img className='offcanvas-body-container-img' src={c.img} />
                <div className='offcanvas-body-container-info'>
                  <h6 className='offcanvas-body-container-info-text'>
                    Modelo: <span>{c.title}</span>
                  </h6>
                  <h6 className='offcanvas-body-container-info-text'>
                    Precio: <span>${formatPrice(c.price)}</span>
                  </h6>
                  <h6 className='offcanvas-body-container-info-text'>
                    Total: <span>${formatPrice(c.price * c.quantity)}</span>
                  </h6>
                  <h6 className='offcanvas-body-container-info-text'>
                    Talle: <span>{c.selectedSize}</span>
                  </h6>
                  <h6 className='offcanvas-body-container-info-text'>Cantidad:</h6>
                  <div className='offcanvas-body-container-info-buttons'>
                    <button onClick={() => dispatch(restQuantity(`${c.id}/${c.selectedSize}`))} className='offcanvas-body-container-info-actions'>
                      -
                    </button>
                    <input id='detail-quantity' type='number' value={c.quantity} min={1} readOnly={true} />
                    <button onClick={() => dispatch(addQuantity(`${c.id}/${c.selectedSize}`))} className='offcanvas-body-container-info-actions'>
                      +
                    </button>
                    <BsTrash onClick={() => dispatch(deleteProduct(`${c.id}/${c.selectedSize}`))} id='delete-cart-button' className='offcanvas-body-container-info-delete' />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className='w-100 text-start mt-3'>No hay productos agregados al carrito</p>
        )}
        {cart.length !== 0 && (
          <>
            <div className='offcanvas-body-total'>
              <h6 className='offcanvas-body-total-title'>Total:</h6>
              <div className='offcanvas-body-total-container'>
                <p className='offcanvas-body-total-container-price'>$ {formatPrice(total)}</p>
                <p className='offcanvas-body-total-container-credit'>O hasta 3 cuotas sin interés de ${formatPrice(total / 3)}</p>
              </div>
            </div>
            <button
              onClick={() =>
                Swal.fire({
                  title: 'Redirigiendo al formulario de compra',
                  confirmButtonColor: '#E54787',
                })
              }
              className='offcanvas-body-pay'
            >
              INICIAR COMPRA
            </button>
          </>
        )}
      </div>
    </div>
  );
}
