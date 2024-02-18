import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { url } from '../../services/httpRequests.js';
import * as Yup from 'yup';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getAllProducts } from '../../app/state/productsSlice';
import { formatPrice } from '../../utils/formatPrice';

import AdminModalEdit from '../../components/AdminModalEdit/AdminModalEdit';
import AdminModalAdd from '../../components/AdminModalAdd/AdminModalAdd';
import './admin.css';

const AuthSchema = Yup.object().shape({
  username: Yup.string().required('Usuario requerido'),
  password: Yup.string().required('Contraseña requerida'),
});

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    if (sessionStorage.getItem('donnacalzados-auth')) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (auth) dispatch(getAllProducts());
  }, [auth]);

  const submitHandler = async values => {
    const res = await fetch(`${url}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: values.username, password: values.password }),
    });
    const data = await res.json();
    if (res.status == 404)
      return Swal.fire({
        title: data.error,
        confirmButtonColor: '#E54787',
      });

    sessionStorage.setItem('donnacalzados-auth', JSON.stringify({ auth: 1 }));
    setAuth(true);
  };

  const handleDeleteProduct = async id_product => {
    if (products.length <= 8)
      return Swal.fire({
        title: 'Error, es necesario que existan 8 productos cargados',
        confirmButtonColor: '#E54787',
      });
    Swal.fire({
      title: 'Estas seguro de eliminar la publicación?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#dc3545',
      denyButtonColor: '#000000',
      denyButtonText: `Cancelar`,
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await fetch(`${url}/api/products/${id_product}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        Swal.fire({
          title: 'Publicación Eliminada',
          confirmButtonColor: '#E54787',
        });

        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });
  };

  return (
    <main className='admin'>
      {!auth ? (
        <section className='admin-section'>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={AuthSchema}
            onSubmit={submitHandler}
          >
            {({ errors, touched }) => (
              <Form className='admin-section-form'>
                <Field className='admin-section-form-input' name='username' placeholder='Usuario' />
                {errors.username && touched.username ? <div className='admin-section-form-errors'>{errors.username}</div> : null}
                <Field className='admin-section-form-input' name='password' placeholder='Contraseña' />
                {errors.password && touched.password ? <div className='admin-section-form-errors'>{errors.password}</div> : null}
                <button className='admin-section-form-button' type='submit'>
                  INICIAR SESIÓN
                </button>
              </Form>
            )}
          </Formik>
        </section>
      ) : (
        <>
          <section className='admin-products'>
            <h1 className='admin-products-title'>Listado de Publicaciones</h1>
            <AdminModalAdd />
            <Table responsive className='admin-products-table' striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Foto</th>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  return (
                    <tr className='admin-products-table-row' key={product.id_product}>
                      <td className='d-flex flex-column align-items-center justify-content-center'>
                        <Link style={{ width: '80px', marginBottom: '5px' }} className='btn btn-xs btn-dark' to={`/secure-admin-panel-product?product=${product.id_product}`}>
                          Colores
                        </Link>
                        <AdminModalEdit product={product} />
                        <button style={{ width: '80px', marginTop: '5px' }} onClick={() => handleDeleteProduct(product.id_product)} className='btn btn-xs btn-danger'>
                          Eliminar
                        </button>
                      </td>
                      <td>
                        <img style={{ width: '70px', borderRadius: '2px' }} src={product.products[0].img} />
                      </td>
                      <td>{product.model}</td>
                      <td>{product.brand}</td>
                      <td>${formatPrice(product.price)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </section>
        </>
      )}
    </main>
  );
}
