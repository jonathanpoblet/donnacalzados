import React, { useEffect, useState } from 'react';
import Payment from '../../../src/bricks/payment';

import initMercadoPago from '../../mercadoPago/initMercadoPago';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { url } from '../../services/httpRequests.js';
import CardPayment from '../../bricks/cardPayment';

initMercadoPago('APP_USR-42cf64cc-48df-4ef0-9df6-0e493a3c7a2a', { locale: 'es-AR' });

const PaymentComponentTest = ({ userInfo, setPayId, setLevel }) => {
  const [preferenceId, setPreferenceId] = useState('');
  const [externalReference, setExternalReference] = useState('');

  const [preferenceIdCard, setPreferenceIdCard] = useState('');
  const [externalReferenceCard, setExternalReferenceCard] = useState('');

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

  const initializationCard = {
    amount: finalPrice,
    preferenceId: preferenceIdCard,
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

  const onSubmit = async ({ selectedPaymentMethod, formData }) => {
    const products = [];
    cart.map(c => {
      products.push({
        model: c.model,
        img: c.img,
        quantity: c.quantity,
        price: c.price,
        size: c.selectedSize,
        category_id: 'fashion',
        description: "Men's, Women's, Kids & baby, Handbags & Accessories, Health & Beauty, Shoes, Jewelry & Watches",
        id: c.model + c.img,
      });
    });

    await fetch(`${url}/api/test/mp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ preferenceId, userInfo, products, external_reference: externalReference }),
    });
  };

  const onSubmitCard = async ({ param }) => {
    const products = [];
    cart.map(c => {
      products.push({
        model: c.model,
        img: c.img,
        quantity: c.quantity,
        price: c.price,
        size: c.selectedSize,
        category_id: 'fashion',
        description: "Men's, Women's, Kids & baby, Handbags & Accessories, Health & Beauty, Shoes, Jewelry & Watches",
        id: c.model + c.img,
      });
    });

    const res = await fetch(`${url}/api/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData: param, userInfo, products, preferenceId, external_reference: externalReferenceCard }),
    });
    const data = await res.json();
    if (data.status == 'rejected') navigate('/pago-rechazado');
    else if (data.status == 'approved') navigate('/pago-confirmado');
    else {
      Swal.fire({
        title: 'Error al procesar tu compra, intenta nuevamente!',
        confirmButtonColor: '#E54787',
      });

      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  };

  const onClickEditShippingData = () => console.log('Calling onClickEditShippingData...');

  const onClickEditBillingData = () => console.log('Calling onClicktEditBillingData...');

  const onRenderNextStep = currentStep => console.log('Calling onRenderNextStep...', currentStep);

  const onRenderPreviousStep = currentStep => console.log('Calling onRenderPreviousStep...', currentStep);

  useEffect(() => {
    const getPreference = async () => {
      const res = await fetch(`${url}/api/test/preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      setPreferenceId(data.preferenceId);
      setExternalReference(data.external_reference);
    };

    const getPreferenceCard = async () => {
      const res = await fetch(`${url}/api/checkout/preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      setPreferenceIdCard(data.preferenceId);
      setExternalReferenceCard(data.external_reference);
    };

    getPreference();
    getPreferenceCard();
  }, [cart]);

  if (preferenceId)
    return (
      <>
        <Payment
          initialization={initialization}
          customization={{
            enableReviewStep: true,
            reviewCardsOrder: ['payment_method', 'shipping', 'billing'],
            paymentMethods: {
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
        <div style={{ borderTop: '1px solid rgb(211, 211, 211)', width: '100%', marginBottom: '10px' }}> </div>
        <CardPayment
          initialization={initializationCard}
          onRenderNextStep={onRenderNextStep}
          onRenderPreviousStep={onRenderPreviousStep}
          onSubmit={async param => onSubmitCard({ param })}
          customization={{
            paymentMethods: {
              maxInstallments: 3,
            },
          }}
        />
      </>
    );
};

export default PaymentComponentTest;
