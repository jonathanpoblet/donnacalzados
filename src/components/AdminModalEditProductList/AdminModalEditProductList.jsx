import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { sizes } from '../../test/sizes';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import './adminModalEditProductList.css';

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
    formData.append('id_product_list', productEdited.id_product_list);
    formData.append('img', productEdited.img);
    formData.append('sizes', productEdited.sizes);

    console.log(productEdited);

    const res = await fetch(`http://localhost:3000/api/products/list`, {
      method: 'PUT',
      body: formData,
    });

    if (res.status !== 201)
      return Swal.fire({
        title: 'Error al editar color, refresque la pagina e intente nuevamente',
        confirmButtonColor: '#E54787',
      });

    const data = await res.json();
    console.log(data);

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
