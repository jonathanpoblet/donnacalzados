import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CheckoutBodyProducts from '../../components/CheckoutBodyProducts/CheckoutBodyProducts';
import CheckoutPay from '../../components/CheckoutPay/CheckoutPay';

import './checkout.css';
import PaymentComponent from '../../components/PaymentComponent/PaymentComponent';

function Checkout() {
  const cart = useSelector(state => state.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tempTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      tempTotal += cart[i].quantity * cart[i].price;
    }
    setTotal(tempTotal);
  }, [cart]);
  return (
    <main className='checkout fade-in'>
      <section className='checkout-header'>
        <Link className='checkout-header-link' to='/'>
          Inicio
        </Link>
        <span className='checkout-header-bar'>/</span>
        <h1 className='checkout-header-title'>Carrito</h1>
      </section>

      <section className='checkout-body'>
        <CheckoutBodyProducts cart={cart} total={total} />
        <CheckoutPay />
      </section>
    </main>
  );
}

export default Checkout;
