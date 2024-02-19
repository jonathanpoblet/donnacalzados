import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { sizes } from '../../test/sizes';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import './adminModalEditProductList.css';
import { url } from '../../services/httpRequests.js';

function AdminModalEditProductList({ product }) {
  const [show, setShow] = useState(false);
  const [productEdited, setProductEdited] = useState({ id_product_list: product.id_product_list, img: '', sizes: [] });
  const [id, setId] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddSize = e => {
    const size = e.target.value;
    const found = productEdited.sizes.find(s => s == size);
    const newProduct = { ...productEdited };
    if (!found) {
      newProduct.sizes.push(size);
      setProductEdited(newProduct);
      e.target.className = 'admin-modal-edit-color-sizes-button admin-modal-edit-color-sizes-button-selected';
    } else {
      const findIndex = newProduct.sizes.indexOf(size);
      newProduct.sizes.splice(findIndex, 1);
      setProductEdited(newProduct);
      e.target.className = 'admin-modal-edit-color-sizes-button';
    }
  };

  const handleAddImgInput = e => {
    const img = e.target.files[0];
    const newProduct = { ...productEdited };
    newProduct.img = img;
    setProductEdited(newProduct);
  };

  const handleAddProductList = async () => {
    if (!productEdited.img)
      return Swal.fire({
        title: 'Foto del producto requerida',
        confirmButtonColor: '#E54787',
      });

    if (!productEdited.sizes.length === 0)
      return Swal.fire({
        title: 'Debes seleccionar por lo menos 1 talle',
        confirmButtonColor: '#E54787',
      });

    const formData = new FormData();
    formData.append('file', productEdited.img);
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

    const updatedProduct = {
      id_product_list: productEdited.id_product_list,
      img: imageUrl,
      sizes: productEdited.sizes,
    };

    const res = await fetch(`${url}/api/list`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    if (res.status !== 201)
      return Swal.fire({
        title: 'Error al editar color, refresque la pagina e intente nuevamente',
        confirmButtonColor: '#E54787',
      });

    Swal.fire({
      title: 'Color Editado',
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
            <Col className='admin-modal-edit-color' id='admin-modal-edit-color' xs={12} style={{ marginBottom: '15px' }}>
              <div className='admin-modal-edit-color'>
                <input type='file' accept='image/jpeg, image/jpg , image/png' className='admin-modal-edit-color-input' onChange={e => handleAddImgInput(e)} />
                <div className='admin-modal-edit-color-sizes'>
                  {sizes.map(size => (
                    <button onClick={e => handleAddSize(e)} key={size} value={size} className='admin-modal-edit-color-sizes-button'>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='primary' onClick={() => handleAddProductList()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminModalEditProductList;
