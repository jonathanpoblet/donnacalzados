import React, { useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './adminModalOrderInfo.css';

function AdminModalOrderInfo({ info }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {info && (
        <>
          <Button variant='primary' className='btn btn-xs btn-dark' onClick={handleShow}>
            Datos Envio
          </Button>

          <Modal show={show} onHide={handleClose} size={'xl'}>
            <Modal.Body>
              <Row>
                <Col className='admin-modal-edit-color' id='admin-modal-edit-color' xs={12} style={{ marginBottom: '15px' }}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Tel</th>
                        <th>Email</th>
                        <th>Provincia</th>
                        <th>Localidad</th>
                        <th>Calle</th>
                        <th>Altura</th>
                        <th>CP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.name}</p>
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.tel}</p>
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.email}</p>
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.state}</p>
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.city}</p>
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.street}</p>
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.number}</p>
                        </td>
                        <td>
                          <p style={{ marginBottom: '0px' }}>{info.cp}</p>
                        </td>
                      </tr>
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

export default AdminModalOrderInfo;
