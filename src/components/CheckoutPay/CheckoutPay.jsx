// src/App.js
import React, { useEffect, useState } from 'react';
import Status from '../Status/Status';
import { Formik, Form, Field } from 'formik';
import PaymentComponent from '../PaymentComponent/PaymentComponent';
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
  };

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
      {level == 2 && <PaymentComponent setPayId={setPayId} setLevel={setLevel} />}
      {level == 3 && <Status payId={payId} />}
    </article>
  );
}

export default CheckoutPay;
