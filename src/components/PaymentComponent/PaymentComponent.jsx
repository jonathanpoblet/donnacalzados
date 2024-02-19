import React, { useEffect, useState } from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../mercadoPago/initMercadoPago';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { url } from '../../services/httpRequests.js';

initMercadoPago('APP_USR-42cf64cc-48df-4ef0-9df6-0e493a3c7a2a', { locale: 'es-AR' });

const PaymentComponent = ({ userInfo, setPayId, setLevel }) => {
  const [preferenceId, setPreferenceId] = useState('');
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const itemsList = [];
  let finalPrice = 0;

  cart.map(c => {
    finalPrice += c.price * c.quantity;
    itemsList.push({
      units: c.quantity,
      value: c.price,
      name: c.model,
      imageURL: c.img,
    });
  });

  const initialization = {
    amount: finalPrice,
    preferenceId: preferenceId,
    items: {
      totalItemsAmount: finalPrice,
      itemsList,
    },
    payer: {
      email: 'jonathanpoblet228@gmail.com',
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    const products = [];
    cart.map(c => {
      products.push({
        model: c.model,
        img: c.img,
        quantity: c.quantity,
        price: c.price,
        size: c.selectedSize,
      });
    });
    if (selectedPaymentMethod !== 'wallet_purchase') {
      const res = await fetch(`${url}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, userInfo, products }),
      });
      const data = await res.json();
      if (data.status === 'rejected') navigate('/pago-rechazado');
      else if (data.status === 'approved') navigate('/pago-confirmado');
      else {
        Swal.fire({
          title: 'Error al procesar tu compra, intenta nuevamente!',
          confirmButtonColor: '#E54787',
        });

        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } else {
      await fetch(`${url}/api/checkout/mp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferenceId, userInfo, products }),
      });
    }
  };

  const onClickEditShippingData = () => console.log('Calling onClickEditShippingData...');

  const onClickEditBillingData = () => console.log('Calling onClicktEditBillingData...');

  const onRenderNextStep = currentStep => console.log('Calling onRenderNextStep...', currentStep);

  const onRenderPreviousStep = currentStep => console.log('Calling onRenderPreviousStep...', currentStep);

  useEffect(() => {
    const getPreferenceId = async () => {
      const res = await fetch(`${url}/api/checkout/preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      setPreferenceId(data.preferenceId);
    };

    getPreferenceId();
  }, [cart]);

  if (preferenceId)
    return (
      <Payment
        initialization={initialization}
        customization={{
          enableReviewStep: true,
          reviewCardsOrder: ['payment_method', 'shipping', 'billing'],
          paymentMethods: {
            bank_transfer: 'all',
            creditCard: 'all',
            debitCard: 'all',
            mercadoPago: 'wallet_purchase',
            maxInstallments: 3,
          },
        }}
        onSubmit={onSubmit}
        onClickEditShippingData={onClickEditShippingData}
        onClickEditBillingData={onClickEditBillingData}
        onRenderNextStep={onRenderNextStep}
        onRenderPreviousStep={onRenderPreviousStep}
      />
    );
};

export default PaymentComponent;
