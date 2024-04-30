import React, { useEffect, useState } from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../mercadoPago/initMercadoPago';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { url } from '../../services/httpRequests.js';

initMercadoPago('APP_USR-ba9ecba8-715b-406a-8186-7435660cc944', { locale: 'es-AR' });

const generateExternalReference = () => {
  const date = new Date();
  const timestamp = date.getTime();
  const random = Math.floor(Math.random() * 1000);
  const reference = timestamp.toString() + random.toString();
  return reference;
};

const PaymentComponent = ({ userInfo, setPayId, setLevel }) => {
  const [preferenceId, setPreferenceId] = useState('');
  const [externalReference, setExternalReference] = useState('');
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
      category_id: 'fashion',
      description: "Men's, Women's, Kids & baby, Handbags & Accessories, Health & Beauty, Shoes, Jewelry & Watches",
      id: c.name + c.img,
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
      email: userInfo.email,
      name: userInfo.name,
      address: {
        street_name: userInfo.calle,
        street_number: userInfo.numero,
        zip_code: userInfo.cp,
      },
    },
  };

  // notification_url: 'https://api.donnacalzados:3001/mp',
  // external_reference: externalReference,

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
      console.log(data);
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

    setExternalReference(generateExternalReference());
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
