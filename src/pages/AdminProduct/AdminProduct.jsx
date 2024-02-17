import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../services/httpRequests.js';
import * as Yup from 'yup';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { getProductById } from '../../app/state/productsSlice';
import AdminModalAddProductList from '../../components/AdminModalAddProductList/AdminModalAddProductList';
import AdminModalEditProductList from '../../components/AdminModalEditProductList/AdminModalEditProductList';
import './adminProduct.css';

const AuthSchema = Yup.object().shape({
  username: Yup.string().required('Usuario requerido'),
  password: Yup.string().required('Contraseña requerida'),
});

export default function AdminProduct() {
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.detail);

  const locationParam = useLocation();
  const queryParams = new URLSearchParams(locationParam.search);
  const id_product = queryParams.get('product');

  useEffect(() => {
    if (sessionStorage.getItem('donnacalzados-auth')) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    if (auth) dispatch(getProductById(id_product));
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

  const handleDeleteProduct = async id_product_list => {
    if (product.products.length === 1)
      return Swal.fire({
        title: 'No es posible eliminar ya que tiene que haber como minimo un color cargado',
        confirmButtonColor: '#E54787',
      });
    Swal.fire({
      title: 'Estas seguro de eliminar el color?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#dc3545',
      denyButtonColor: '#000000',
      denyButtonText: `Cancelar`,
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await fetch(`${url}/api/products/list/${id_product_list}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log(data);
        Swal.fire({
          title: 'Color Eliminado',
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
          <section className='admin-product'>
            <h1 className='admin-product-title'>{product.model}</h1>
            <AdminModalAddProductList product={product} />
            <Table responsive className='admin-product-table' striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Foto</th>
                  <th>Talles</th>
                </tr>
              </thead>
              <tbody>
                {product.products &&
                  product.products.map(p => {
                    return (
                      <tr className='admin-product-table-row' key={p.id_product_list}>
                        <td>
                          <button onClick={() => handleDeleteProduct(p.id_product_list)} className='btn btn-xs btn-danger'>
                            Eliminar
                          </button>
                        </td>
                        <td>
                          <AdminModalEditProductList product={p} />
                        </td>
                        <td>
                          <img style={{ width: '70px', borderRadius: '2px' }} src={p.img} />
                        </td>
                        <td>
                          {p.sizes.map(size => {
                            return (
                              <button key={p.id_product_list + '/' + size} className='btn btn-xs btn-dark' style={{ margin: '0px 5px 5px 0px', fontSize: '12px' }}>
                                {size}
                              </button>
                            );
                          })}
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
