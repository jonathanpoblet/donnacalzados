import { CiCircleCheck } from 'react-icons/ci';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../app/state/cartSlice';
import { useLocation } from 'react-router-dom';
import { url } from '../../services/httpRequests.js';
import './success.css';

export default function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setPaid = async () => {
    await fetch(`${url}/api/checkout/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ preference_id: queryParams.get('preference_id') }),
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const confirmPay = async () => {
      dispatch(resetCart());
      await setPaid();
    };

    confirmPay();
  }, []);

  return (
    <main className='success fade-in'>
      <section className='success-section'>
        <CiCircleCheck />
        <p style={{ letterSpacing: '1px', fontSize: '15px', marginBottom: '50px', marginTop: '20px' }}>
          Muchas gracias por su compra! Recibira un email con los detalles de los productos comprados. Recuerde que los envios se realizan a partir de los 5 dias habiles despues de haber realizado la compra. Una vez enviado los calzados, recibira un email con el codigo de seguimiento.
        </p>
      </section>
    </main>
  );
}
