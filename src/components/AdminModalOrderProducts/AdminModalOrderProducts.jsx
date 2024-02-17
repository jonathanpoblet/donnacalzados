import React, { useState } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';
import { url } from '../../services/httpRequests.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import './adminModalOrderProducts.css';

function AdminModalOrderProducts({ products }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {products && (
        <>
          <Button variant='primary' className='btn btn-xs btn-primary' onClick={handleShow}>
            Productos
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <Row>
                <Col className='admin-modal-edit-color' id='admin-modal-edit-color' xs={12} style={{ marginBottom: '15px' }}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Imágen</th>
                        <th>Modelo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <img style={{ maxWidth: '90px' }} src={product.img} alt='product' />
                            </td>
                            <td>
                              <p>{product.model}</p>
                            </td>
                            <td>
                              <p>{product.price}</p>
                            </td>
                            <td>
                              <p>{product.quantity}</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default AdminModalOrderProducts;
