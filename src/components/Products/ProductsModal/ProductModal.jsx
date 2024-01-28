import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../../utils/formatPrice';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

import './productModal.css';
import { addToCart } from '../../../app/state/cartSlice';

export default function ProductModal(props) {
  const dispatch = useDispatch();

  const [tempProduct, setTempProduct] = useState({});

  const addQuantity = () => {
    if (tempProduct.quantity === 99) {
      return Swal.fire({
        title: 'Cantidad máxima',
        confirmButtonColor: '#E54787',
      });
    }

    setTempProduct({
      ...tempProduct,
      quantity: tempProduct.quantity + 1,
    });
  };

  const restQuantity = () => {
    if (tempProduct.quantity === 1) {
      return Swal.fire({
        title: 'Cantidad mínima',
        confirmButtonColor: '#E54787',
      });
    }
    setTempProduct({
      ...tempProduct,
      quantity: tempProduct.quantity - 1,
    });
  };

  const handleSelectProduct = e => {
    const index = props.product.products.findIndex(p => p.img == e.target.id);
    const newProductSelected = { ...props.product, products: props.product.products[index], quantity: 1 };

    const imgs = document.getElementsByClassName('product-modal-body-info-colors-img');
    const imgArray = Array.from(imgs);

    imgArray.forEach(i => {
      i.className = 'product-modal-body-info-colors-img';
    });

    e.target.className = 'product-modal-body-info-colors-img img-selected';

    const sizes = document.getElementsByClassName('product-modal-active-size');
    const sizesArray = Array.from(sizes);

    sizesArray.forEach(size => {
      size.className = 'product-modal-body-info-sizes-buttons';
    });
    setTempProduct(newProductSelected);
  };

  const selectSize = e => {
    if (e.target.className === 'product-modal-body-info-sizes-buttons product-modal-active-size') return (e.target.className = 'product-modal-body-info-sizes-buttons');
    const sizes = document.getElementsByClassName('product-modal-body-info-sizes-buttons');

    const sizesArray = Array.from(sizes);

    sizesArray.forEach(size => {
      size.className = 'product-modal-body-info-sizes-buttons';
    });

    e.target.className = 'product-modal-body-info-sizes-buttons product-modal-active-size';
  };

  const addProductToCart = () => {
    const size = document.getElementsByClassName('product-modal-active-size');
    if (size.length === 0) {
      Swal.fire({
        title: 'Debes seleccionar un talle',
        confirmButtonColor: '#E54787',
      });
      return;
    }
    if (!tempProduct.quantity || tempProduct.quantity < 1) {
      Swal.fire({
        title: 'La cantidad debe ser mayor a 1 unidad',
        confirmButtonColor: '#E54787',
      });
      return;
    }

    const newProduct = {
      ...tempProduct,
      selectedSize: size[0].value,
      idCartProduct: `${tempProduct.products.img}/${size[0].value}`,
      quantity: tempProduct.quantity,
      img: tempProduct.products.img,
    };

    dispatch(addToCart(newProduct, props.onHide()));
    props.onHide();
  };

  useEffect(() => {
    setTempProduct({
      ...props.product,
      products: props.product.products && props.product.products[0],
      quantity: 1,
    });
  }, [props.product]);

  useEffect(() => {
    const imgs = document.getElementsByClassName('product-modal-body-info-colors-img');
    const imgArray = Array.from(imgs);

    if (tempProduct.products) {
      const found = imgArray.find(i => i.id == tempProduct.products.img);

      found.className = 'product-modal-body-info-colors-img img-selected';
    }
  }, [tempProduct]);

  return (
    <Modal className='product-modal' style={{ letterSpacing: '1px' }} {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Body className='product-modal-body'>
        <img className='product-modal-body-img' src={tempProduct.products && tempProduct.products.img} alt='Calzado' />
        <div className='product-modal-body-info'>
          <div className='product-modal-body-info-title-container'>
            <h2 className='product-modal-body-info-title'>{props.product && props.product.model}</h2>
            <button onClick={() => props.onHide()} type='button' className='btn-close' aria-label='Close' closebutton='true'></button>
          </div>
          <p className='product-modal-body-info-price'>
            $ {formatPrice(props.product && props.product.price)}
            <small className='mt-2'>
              {' '}
              (O hasta 3 cuotas sin interés de <b>${formatPrice(props.product && props.product.price / 3)}</b>)
            </small>
          </p>

          <label>Colores</label>
          <div className='product-modal-body-info-colors'>
            {props.product.products &&
              props.product.products.map(p => {
                return <img onClick={e => handleSelectProduct(e)} key={p.img} id={p.img} className='product-modal-body-info-colors-img' src={p.img} alt='Calzado' />;
              })}
          </div>
          <label>Talles</label>
          <div className='product-modal-body-info-sizes'>
            {tempProduct.products &&
              tempProduct.products.sizes.map(p => {
                return (
                  <button className='product-modal-body-info-sizes-buttons' value={p} onClick={e => selectSize(e)} key={p}>
                    {p}
                  </button>
                );
              })}
          </div>
          <label>Cantidad</label>
          <div className='product-modal-body-info-buttons'>
            <button onClick={() => restQuantity()} className='product-modal-info-actions'>
              -
            </button>
            <input id='detail-quantity' type='number' value={tempProduct.quantity} min={1} readOnly={true} />
            <button onClick={() => addQuantity()} className='product-modal-info-actions'>
              +
            </button>
          </div>
          <button onClick={() => addProductToCart()} className='product-modal-body-info-add' closebutton='true'>
            AGREGAR AL CARRITO
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
