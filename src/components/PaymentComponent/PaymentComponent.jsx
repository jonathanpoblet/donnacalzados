import React, { useEffect, useState } from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../mercadoPago/initMercadoPago';
import { useSelector } from 'react-redux';

initMercadoPago('TEST-907ca3b4-73cf-4b28-895c-6604f59c5000', { locale: 'es-AR' });

const PaymentComponent = ({ setPayId, setLevel }) => {
  const [preferenceId, setPreferenceId] = useState('');

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
    const res = await fetch('http://localhost:3000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    setLevel(3);
    setPayId(data.id);
  };

  const onClickEditShippingData = () => console.log('Calling onClickEditShippingData...');

  const onClickEditBillingData = () => console.log('Calling onClicktEditBillingData...');

  const onRenderNextStep = currentStep => console.log('Calling onRenderNextStep...', currentStep);

  const onRenderPreviousStep = currentStep => console.log('Calling onRenderPreviousStep...', currentStep);

  useEffect(() => {
    const getPreferenceId = async () => {
      const res = await fetch('http://localhost:3000/api/checkout/preference', {
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
            mercadoPago: 'all',
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
