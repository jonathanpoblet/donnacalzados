import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { url } from '../../services/httpRequests.js';
import * as Yup from 'yup';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './adminOrders.css';
import AdminModalOrderProducts from '../../components/AdminModalOrderProducts/AdminModalOrderProducts.jsx';
import AdminModalOrderInfo from '../../components/AdminModalOrderInfo/AdminModalOrderInfo.jsx';

const AuthSchema = Yup.object().shape({
  username: Yup.string().required('Usuario requerido'),
  password: Yup.string().required('Contraseña requerida'),
});

export default function AdminOrders() {
  const [orders, setOrders] = useState();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('donnacalzados-auth')) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(`${url}/api/checkout/orders`);
      const data = await res.json();
      setOrders(data);
    };

    getOrders();
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

  const handleDeliverOrder = async id_order => {
    Swal.fire({
      title: 'Codigo de envio',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const codigo_envio = result.value;

        if (!codigo_envio)
          return Swal.fire({
            title: 'Es necesario cargar el codigo de seguimiento',
            confirmButtonColor: '#E54787',
          });

        const res = await fetch(`${url}/api/checkout/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_order, codigo_envio }),
        });

        if (res.status == 200) {
          Swal.fire({
            title: 'Producto Entregado',
            confirmButtonColor: '#E54787',
          });

          setTimeout(() => {
            location.reload();
          }, 1500);
        }
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
          <section className='admin-product'>
            <h1 className='admin-product-title'>Listado de Ordenes</h1>
            <Table responsive className='admin-product-table' striped bordered hover>
              <thead>
                <tr>
                  <th>Entregar/Codigo Envio</th>
                  <th>Productos pedidos</th>
                  <th>Datos Envio</th>
                  <th>Nro Orden</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {order.order.delivered !== 1 ? (
                            <button className='btn btn-xs btn-success' onClick={() => handleDeliverOrder(order.order.id_order)}>
                              Entregar
                            </button>
                          ) : (
                            <p style={{ marginBottom: '0px' }}>{order.order.codigo_envio}</p>
                          )}
                        </td>
                        <td>
                          <AdminModalOrderProducts products={order.orderProducts} />
                        </td>
                        <td>
                          <AdminModalOrderInfo info={order.order} />
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{order.order.id_order}</p>
                        </td>
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
