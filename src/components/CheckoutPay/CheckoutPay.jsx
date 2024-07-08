// src/App.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { resetCart } from '../../app/state/cartSlice';
import PaymentComponent from '../PaymentComponent/PaymentComponent';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import './checkoutPay.css';

function CheckoutPay() {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const [pay, setPay] = useState(false);
  const [payId, setPayId] = useState();

  const [level, setLevel] = useState(1);

  const [userInfo, setUserInfo] = useState({});

  const UserInfoSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre requerido'),
    email: Yup.string().email('Email invalido').required('Email requerido'),
    tel: Yup.string().required('Telefono requerido'),
    provincia: Yup.string().required('Provincia requerida'),
    localidad: Yup.string().required('Localidad requerida'),
    calle: Yup.string().required('Calle requerida'),
    altura: Yup.number().typeError('Debe ser de valor numerico').positive('Debe ser numero positivo').required('Altura requerida'),
    dep_number: Yup.number().typeError('Debe ser de valor numerico').positive('Debe ser numero positivo'),
    codigo_postal: Yup.string().required('Codigo Postal requerido'),
  });

  const submitHandler = values => {
    if (cart.length === 0)
      return Swal.fire({
        title: 'No hay productos en el carrito',
        confirmButtonColor: '#E54787',
      });
    setLevel(2);
    setUserInfo({
      name: values.nombre,
      email: values.email,
      tel: values.tel,
      state: values.provincia,
      city: values.localidad,
      street: values.calle,
      number: values.altura,
      dep_number: values.dep_number,
      cp: values.codigo_postal,
    });
    setRender(true);
  };

  useEffect(() => {
    if (level === 3) {
      const confirmPay = async () => {
        dispatch(resetCart());
        navigate('/pago-confirmado');
      };

      confirmPay();
    }
  }, [level]);

  return (
    <article className='checkout-pay'>
      {level == 1 && (
        <div className='checkout-pay-info'>
          <h2 className='checkout-pay-info-title'>Datos de Envio</h2>
          <Formik
            initialValues={{
              nombre: '',
              email: '',
              tel: '',
              provincia: '',
              localidad: '',
              calle: '',
              altura: '',
              dep_number: '',
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

                <Field className='checkout-pay-info-form-input' name='tel' placeholder='Telefono' />
                {errors.tel && touched.tel ? <div className='checkout-pay-info-form-errors'>{errors.tel}</div> : null}

                <Field className='checkout-pay-info-form-input' name='provincia' placeholder='Provincia' />
                {errors.provincia && touched.provincia ? <div className='checkout-pay-info-form-errors'>{errors.provincia}</div> : null}

                <Field className='checkout-pay-info-form-input' name='localidad' placeholder='Localidad' />
                {errors.localidad && touched.localidad ? <div className='checkout-pay-info-form-errors'>{errors.localidad}</div> : null}

                <Field className='checkout-pay-info-form-input' name='calle' placeholder='Calle' />
                {errors.calle && touched.calle ? <div className='checkout-pay-info-form-errors'>{errors.calle}</div> : null}

                <Field className='checkout-pay-info-form-input' name='altura' placeholder='Altura' />
                {errors.altura && touched.altura ? <div className='checkout-pay-info-form-errors'>{errors.altura}</div> : null}

                <Field className='checkout-pay-info-form-input' name='dep_number' placeholder='Numero de Departamento (opcional)' />
                {errors.dep_number && touched.dep_number ? <div className='checkout-pay-info-form-errors'>{errors.dep_number}</div> : null}

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
      {(level == 2 || level == 3) && <PaymentComponent userInfo={userInfo} setPayId={setPayId} setLevel={setLevel} />}
    </article>
  );
}

export default CheckoutPay;
