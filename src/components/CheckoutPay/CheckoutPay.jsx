// src/App.js
import React, { useEffect, useState } from 'react';
import Status from '../Status/Status';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import './checkoutPay.css';

function CheckoutPay() {
  const [render, setRender] = useState(false);
  const [pay, setPay] = useState(false);
  const [payId, setPayId] = useState();

  const [level, setLevel] = useState(1);

  const [userInfo, setUserInfo] = useState();

  const UserInfoSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre requerido'),
    email: Yup.string().email('Email invalido').required('Email requerido'),
    provincia: Yup.string().required('Provincia requerida'),
    localidad: Yup.string().required('Localidad requerida'),
    calle: Yup.string().required('Calle requerida'),
    altura: Yup.number().typeError('Debe ser de valor numerico').positive('Debe ser numero positivo').required('Altura requerida'),
    codigo_postal: Yup.string().required('Codigo Postal requerido'),
  });

  const submitHandler = values => {
    setLevel(2);
    setUserInfo(values);
    setRender(true);
    console.log(userInfo);
  };

  useEffect(() => {
    if (render) {
      const fetchData = async () => {
        const mp = new MercadoPago('TEST-907ca3b4-73cf-4b28-895c-6604f59c5000', {
          locale: 'es-CO',
        });
        const bricksBuilder = mp.bricks();
        const renderPaymentBrick = async bricksBuilder => {
          const settings = {
            initialization: {
              amount: 10000,
              preferenceId: '<PREFERENCE_ID>',
              payer: {
                firstName: '',
                lastName: '',
                email: '',
              },
            },
            customization: {
              visual: {
                style: {
                  theme: 'default',
                },
              },
              paymentMethods: {
                creditCard: 'all',
                debitCard: 'all',
                onboarding_credits: 'all',
                wallet_purchase: 'all',
                maxInstallments: 1,
              },
              backUrls: {
                error: 'http://localhost:5173/donnacalzados/#/',
                return: 'http://localhost:5173/donnacalzados/#/',
              },
            },
            callbacks: {
              onReady: () => {
                /*
                 Callback llamado cuando el Brick está listo.
                 Aquí puede ocultar cargamentos de su sitio, por ejemplo.
                */
              },
              onSubmit: ({ selectedPaymentMethod, formData }) => {
                // callback llamado al hacer clic en el botón de envío de datos
                return new Promise((resolve, reject) => {
                  fetch('http://localhost:3000/api/checkout', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  })
                    .then(response => response.json())
                    .then(response => {
                      setPay(true);
                      setPayId('1321005437');
                      setRender(true);
                      setLevel(3);
                      resolve();
                    })
                    .catch(error => {
                      // manejar la respuesta de error al intentar crear el pago
                      reject();
                    });
                });
              },
              onError: error => {
                // callback llamado para todos los casos de error de Brick
                console.error(error);
              },
            },
          };
          window.paymentBrickController = await bricksBuilder.create('payment', 'paymentBrick_container', settings);
        };
        renderPaymentBrick(bricksBuilder);
      };

      fetchData();
    }
  }, [render]);

  return (
    <article className='checkout-pay'>
      {level == 1 && (
        <div className='checkout-pay-info'>
          <h2 className='checkout-pay-info-title'>Datos de Envio</h2>
          <Formik
            initialValues={{
              nombre: '',
              email: '',
              provincia: '',
              localidad: '',
              calle: '',
              altura: '',
              codigo_postal: '',
            }}
            validationSchema={UserInfoSchema}
            onSubmit={submitHandler}
          >
            {({ errors, touched }) => (
              <Form className='checkout-pay-info-form'>
                <Field className='checkout-pay-info-form-input' name='nombre' placeholder='Nombre Completo' />
                {errors.nombre && touched.nombre ? <div className='checkout-pay-info-form-errors'>{errors.nombre}</div> : null}
                <Field className='checkout-pay-info-form-input' name='email' placeholder='Email' />
                {errors.email && touched.email ? <div className='checkout-pay-info-form-errors'>{errors.email}</div> : null}
                <Field className='checkout-pay-info-form-input' name='provincia' placeholder='Provincia' />
                {errors.provincia && touched.provincia ? <div className='checkout-pay-info-form-errors'>{errors.provincia}</div> : null}
                <Field className='checkout-pay-info-form-input' name='localidad' placeholder='Localidad' />
                {errors.localidad && touched.localidad ? <div className='checkout-pay-info-form-errors'>{errors.localidad}</div> : null}
                <Field className='checkout-pay-info-form-input' name='calle' placeholder='Calle' />
                {errors.calle && touched.calle ? <div className='checkout-pay-info-form-errors'>{errors.calle}</div> : null}
                <Field className='checkout-pay-info-form-input' name='altura' placeholder='Altura' />
                {errors.altura && touched.altura ? <div className='checkout-pay-info-form-errors'>{errors.altura}</div> : null}
                <Field className='checkout-pay-info-form-input' name='codigo_postal' placeholder='Codigo Postal' />
                {errors.codigo_postal && touched.codigo_postal ? <div className='checkout-pay-info-form-errors'>{errors.codigo_postal}</div> : null}
                <button className='checkout-pay-info-form-button' type='submit'>
                  CONTINUAR
                </button>
                <div id='noexiste'></div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {level == 2 && <div id='paymentBrick_container' className='checkout-pay-brick'></div>}
      {level == 3 && <Status payId={payId} />}
    </article>
  );
}

export default CheckoutPay;
