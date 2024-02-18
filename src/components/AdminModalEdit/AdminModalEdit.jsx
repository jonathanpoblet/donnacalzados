import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { url } from '../../services/httpRequests.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import './adminModalEdit.css';

function AdminModalEdit({ product }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddProduct = async () => {
    const model = document.getElementById('admin-product-edit-model').value;
    const brand = document.getElementById('admin-product-edit-brand').value;
    const price = document.getElementById('admin-product-edit-price').value;

    if (!model || !brand || !price)
      return Swal.fire({
        title: 'Faltan datos del producto',
        confirmButtonColor: '#E54787',
      });

    const form = {
      model,
      brand,
      price,
    };

    const res = await fetch(`${url}/api/products/${product.id_product}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.status === 400)
      return Swal.fire({
        title: 'Error al editar Producto, refresque la pagina e intente nuevamente',
        confirmButtonColor: '#E54787',
      });

    Swal.fire({
      title: 'Producto Editado',
      confirmButtonColor: '#E54787',
    });

    setTimeout(() => {
      location.reload();
    }, 2000);
  };

  return (
    <>
      <Button variant='primary' className='admin-products-edit' onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Row>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <Form.Label style={{ marginBottom: '10px' }}>Modelo</Form.Label>
              <Form.Control type='text' id='admin-product-edit-model' defaultValue={product.model} />
            </Col>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <Form.Label style={{ marginBottom: '10px' }}>Marca</Form.Label>
              <Form.Select id='admin-product-edit-brand' defaultValue={product.id_brand}>
                <option value=''>--- Selecciona una marca ---</option>
                <option value='1'>Nike</option>
                <option value='2'>Vans</option>
                <option value='3'>Adidas</option>
                <option value='4'>Converse</option>
                <option value='5'>New Balance</option>
                <option value='6'>Puma</option>
              </Form.Select>
            </Col>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '10px' }}>
                Precio <small>(No ingresar "." ni "," ni "$")</small>
              </label>
              <Form.Control type='number' id='admin-product-edit-price' defaultValue={product.price} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={handleAddProduct}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminModalEdit;
