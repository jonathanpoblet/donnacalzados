import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { url } from '../../services/httpRequests.js';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

import './homeContact.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Nombre requerido'),
  email: Yup.string().email('Email invalido').required('Email requerido'),
  message: Yup.string().required('Mensaje requerido'),
});

const submitHandler = async values => {
  console.log(values);
  const res = await fetch(`${url}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });

  if (!res.status === 200)
    return Swal.fire({
      title: 'Error al enviar su consulta, por favor reinicie la web',
      confirmButtonColor: '#E54787',
    });

  let timerInterval;
  Swal.fire({
    title: 'Mensaje enviado!',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector('b');
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });

  setTimeout(() => {
    location.reload();
  }, 2000);
};

export default function HomeContact() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className='home-contact' data-aos='fade-up' data-aos-offset='200' data-aos-easing='ease-in-sine' data-aos-duration='600'>
      <h2 className='home-contact-title'>CONTACTANOS</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validationSchema={ContactSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form className='home-contact-form'>
            <Field className='home-contact-form-input' name='name' placeholder='Nombre' />
            {errors.name && touched.name ? <div className='home-contact-form-errors'>{errors.name}</div> : null}
            <Field className='home-contact-form-input' name='email' placeholder='Email' />
            {errors.email && touched.email ? <div className='home-contact-form-errors'>{errors.email}</div> : null}
            <Field as='textarea' className='home-contact-form-textarea' name='message' placeholder='Mensaje' />{' '}
            {errors.message && touched.message ? <div className='home-contact-form-errors'>{errors.message}</div> : null}
            <button className='home-contact-form-button' type='submit'>
              ENVIAR
            </button>
            <div id='noexiste'></div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
