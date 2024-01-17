import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './homeContact.css';

const ContactSchema = Yup.object().shape({
  nombre: Yup.string().required('Nombre requerido'),
  email: Yup.string().email('Email invalido').required('Email requerido'),
  mensaje: Yup.string().required('Mensaje requerido'),
});

const submitHandler = values => {
  console.log(values);
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
          nombre: '',
          email: '',
          mensaje: '',
        }}
        validationSchema={ContactSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form className='home-contact-form'>
            <Field className='home-contact-form-input' name='nombre' placeholder='Nombre' />
            {errors.nombre && touched.nombre ? <div className='home-contact-form-errors'>{errors.nombre}</div> : null}
            <Field className='home-contact-form-input' name='email' placeholder='Email' />
            {errors.email && touched.email ? <div className='home-contact-form-errors'>{errors.email}</div> : null}
            <Field as='textarea' className='home-contact-form-textarea' name='mensaje' placeholder='Mensaje' /> {errors.mensaje && touched.mensaje ? <div className='home-contact-form-errors'>{errors.mensaje}</div> : null}
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
