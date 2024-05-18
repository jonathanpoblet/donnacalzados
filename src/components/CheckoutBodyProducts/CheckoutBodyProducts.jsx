import React from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { BsTrash } from 'react-icons/bs';

import './checkoutBodyProducts.css';
import { addQuantity, deleteProduct, restQuantity } from '../../app/state/cartSlice';
import { useDispatch } from 'react-redux';

export default function CheckoutBodyProducts({ cart, total }) {
  const dispatch = useDispatch();

  return (
    <article className='checkout-body-products'>
      {cart.length !== 0 ? (
        cart.map(c => {
          return (
            <div className='checkout-body-products-container' key={c.idCartProduct}>
              <img className='checkout-body-products-container-img' src={c.img} />
              <div className='checkout-body-products-container-info'>
                <h6 className='checkout-body-products-container-info-text'>
                  Modelo: <span>{c.model}</span>
                </h6>
                <h6 className='checkout-body-products-container-info-text'>
                  Precio: <span>${formatPrice(c.price)}</span>
                </h6>
                <h6 className='checkout-body-products-container-info-text'>
                  Total: <span>${formatPrice(c.price * c.quantity)}</span>
                </h6>
                <h6 className='checkout-body-products-container-info-text'>
                  Talle: <span>{c.selectedSize}</span>
                </h6>
                <h6 className='checkout-body-products-container-info-text'>Cantidad:</h6>
                <div className='checkout-body-products-container-info-buttons'>
                  <button onClick={() => dispatch(restQuantity(c.idCartProduct))} className='checkout-body-products-container-info-actions'>
                    -
                  </button>
                  <input id='detail-quantity' type='number' value={c.quantity} min={1} readOnly={true} />
                  <button onClick={() => dispatch(addQuantity(c.idCartProduct))} className='checkout-body-products-container-info-actions'>
                    +
                  </button>
                  <BsTrash onClick={() => dispatch(deleteProduct(c.idCartProduct))} id='delete-cart-button' className='checkout-body-products-container-info-delete' />
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
          <div className='checkout-body-total'>
            <h6 className='checkout-body-total-title'>Total:</h6>
            <div className='checkout-body-total-container'>
              <p className='checkout-body-total-container-price'>$ {formatPrice(total)}</p>
            </div>
          </div>
          <p className='checkout-body-total-info' style={{ fontSize: '14px', marginTop: '10px' }}>
            <b style={{ color: '#e54787' }}>10%</b> descuento abonando con <b style={{ color: '#e54787' }}>Mercado Pago.</b>
          </p>
          <p className='checkout-body-total-info' style={{ fontSize: '14px', marginTop: '5px' }}>
            Una vez abonado el producto, aguarda a ser redirigido nuevamente a nuestro sitio web. Envio gratis a toda la Argentina.
          </p>
        </>
      )}
    </article>
  );
}
