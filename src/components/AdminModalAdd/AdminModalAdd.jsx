import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { sizes } from '../../test/sizes';
import { url } from '../../services/httpRequests.js';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import './adminModalAdd.css';

function AdminModalAdd() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddSize = (e, index) => {
    const size = e.target.value;
    const found = products[index].sizes.find(s => s == size);
    const newProducts = [...products];
    if (!found) {
      newProducts[index].sizes.push(size);
      setProducts(newProducts);
      e.target.className = 'admin-modal-add-color-sizes-button admin-modal-add-color-sizes-button-selected';
    } else {
      const findIndex = newProducts[index].sizes.indexOf(size);
      newProducts[index].sizes.splice(findIndex, 1);
      setProducts(newProducts);
      e.target.className = 'admin-modal-add-color-sizes-button';
    }
  };

  const handleAddImgInput = (e, index) => {
    const img = e.target.files[0];
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], img };
    setProducts(newProducts);
  };

  const handleDeleteProduct = index => {
    const newProducts = products.filter((p, i) => i !== index);
    setProducts(newProducts);
  };

  const addColorRow = () => {
    if (products.length === 5)
      return Swal.fire({
        title: 'Máximo 5 colores por publicación',
        confirmButtonColor: '#E54787',
      });
    setProducts([...products, { img: null, sizes: [], id: id }]);
    setId(id + 1);
  };

  const handleAddProduct = async () => {
    const model = document.getElementById('admin-product-add-model').value;
    const brand = document.getElementById('admin-product-add-brand').value;
    const price = document.getElementById('admin-product-add-price').value;

    if (!model || !brand || !price)
      return Swal.fire({
        title: 'Faltan datos del producto',
        confirmButtonColor: '#E54787',
      });

    if (products.length == 0)
      return Swal.fire({
        title: 'Debes cargar por lo menos 1 color',
        confirmButtonColor: '#E54787',
      });

    for (let i = 0; i < products.length; i++) {
      if (products[i].img === null || !products[i].img)
        return Swal.fire({
          title: 'Foto del producto requerida',
          confirmButtonColor: '#E54787',
        });
      if (products[i].sizes.length === 0)
        return Swal.fire({
          title: 'Debes seleccionar por lo menos 1 talle',
          confirmButtonColor: '#E54787',
        });
    }

    const updatedProducts = await Promise.all(
      products.map(async product => {
        try {
          const formData = new FormData();
          formData.append('file', product.img);
          formData.append('upload_preset', 'donnacalzados');

          const response = await fetch('https://api.cloudinary.com/v1_1/dmx8e4tt0/image/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Error al cargar la imagen en Cloudinary');
          }

          const data = await response.json();
          const imageUrl = data.secure_url;

          return {
            ...product,
            img: imageUrl,
          };
        } catch (error) {
          return product;
        }
      })
    );

    const form = {
      model,
      brand,
      price,
      products: updatedProducts,
    };

    const res = await fetch(`${url}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    console.log(res);

    if (res.status !== 201)
      return Swal.fire({
        title: 'Error al agregar Producto, refresque la pagina e intente nuevamente',
        confirmButtonColor: '#E54787',
      });

    Swal.fire({
      title: 'Producto Agregado',
      confirmButtonColor: '#E54787',
    });

    setTimeout(() => {
      location.reload();
    }, 2000);
  };

  return (
    <>
      <Button variant='success' className='admin-products-add' onClick={handleShow}>
        AGREGAR PUBLICACIÓN
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Row>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <Form.Label style={{ marginBottom: '10px' }}>Modelo</Form.Label>
              <Form.Control type='text' id='admin-product-add-model' />
            </Col>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <Form.Label style={{ marginBottom: '10px' }}>Marca</Form.Label>
              <Form.Select id='admin-product-add-brand'>
                <option value=''>--- Selecciona una marca ---</option>
                <option value='1'>Nike</option>
                <option value='2'>Vans</option>
                <option value='3'>Adidas</option>
                <option value='4'>Converse</option>
                <option value='5'>New Balance</option>
              </Form.Select>
            </Col>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '10px' }}>
                Precio <small>(No ingresar "." ni "," ni "$")</small>
              </label>
              <Form.Control type='number' id='admin-product-add-price' />
            </Col>
            <Col xs={12} style={{ marginBottom: '15px' }}>
              <button onClick={addColorRow} type='button' className='btn btn-dark' style={{ fontSize: '14px' }}>
                Agregar Color
              </button>
            </Col>
            <Col className='admin-modal-add-color' id='admin-modal-add-color' xs={12} style={{ marginBottom: '15px' }}>
              {products.map((product, index) => (
                <div key={product.id} className='admin-modal-add-color'>
                  <input type='file' accept='image/jpeg, image/jpg , image/png' className='admin-modal-add-color-input' onChange={e => handleAddImgInput(e, index)} />
                  <div className='admin-modal-add-color-sizes'>
                    {sizes.map(size => (
                      <button onClick={e => handleAddSize(e, index)} key={size} value={size} className='admin-modal-add-color-sizes-button'>
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className='admin-modal-add-color-actions'>
                    <button onClick={() => handleDeleteProduct(index)} className='btn btn-xs btn-danger' style={{ fontSize: '13px', marginTop: '10px' }} type='button'>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={handleAddProduct}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminModalAdd;
