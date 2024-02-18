import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { addToCart } from '../../app/state/cartSlice';
import Swal from 'sweetalert2';

import './detail.css';
import { getProductById } from '../../app/state/productsSlice';
import Spinner from '../../components/Spinner/Spinner';

export default function Detail() {
  const product = useSelector(state => state.products.detail);
  const loading = useSelector(state => state.products.loading);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const product_id = queryParams.get('producto');

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const formatPrice = number => {
    const formatNumber = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);

    return formatNumber;
  };

  const addProductToCart = () => {
    const size = document.getElementsByClassName('detail-active-size');
    if (size.length === 0) {
      Swal.fire({
        title: 'Debes seleccionar un talle',
        confirmButtonColor: '#E54787',
      });
      return;
    }
    if (!quantity || quantity < 1) {
      Swal.fire({
        title: 'La cantidad debe ser mayor a 1 unidad',
        confirmButtonColor: '#E54787',
      });
      return;
    }

    const newProduct = {
      ...selectedProduct,
      selectedSize: size[0].value,
      idCartProduct: selectedProduct.img + '/' + size[0].value,
      quantity: quantity,
      img: selectedProduct.img,
    };
    dispatch(addToCart(newProduct));
  };

  const selectSize = e => {
    if (e.target.className === 'detail-body-info-sizes-buttons detail-active-size') return (e.target.className = 'detail-body-info-sizes-buttons');
    const sizes = document.getElementsByClassName('detail-body-info-sizes-buttons');

    const sizesArray = Array.from(sizes);

    sizesArray.forEach(size => {
      size.className = 'detail-body-info-sizes-buttons';
    });

    e.target.className = 'detail-body-info-sizes-buttons detail-active-size';
  };

  const addQuantity = () => {
    if (quantity === 99) {
      return Swal.fire({
        title: 'Cantidad máxima',
        confirmButtonColor: '#E54787',
      });
    }
    setQuantity(quantity + 1);
  };

  const restQuantity = () => {
    if (quantity === 1) {
      return Swal.fire({
        title: 'Cantidad mínima',
        confirmButtonColor: '#E54787',
      });
    }
    setQuantity(quantity - 1);
  };

  const handleSelectProduct = e => {
    const index = product.products.findIndex(p => p.img == e.target.id);
    const newProductSelected = {
      id_product: product.id_product,
      brand: product.brand,
      price: product.price,
      model: product.model,
      img: product.products && product.products[index].img,
      sizes: product.products && product.products[index].sizes,
      id_product_list: product.products && product.products[index].id_product_list,
    };
    const sizes = document.getElementsByClassName('detail-active-size');
    const sizesArray = Array.from(sizes);

    sizesArray.forEach(size => {
      size.className = 'detail-body-info-sizes-buttons';
    });

    const imgs = document.getElementsByClassName('detail-body-info-colors');
    const imgArray = Array.from(imgs);

    imgArray.forEach(i => {
      i.className = 'detail-body-info-colors';
    });

    e.target.className = 'detail-body-info-colors img-selected';

    setSelectedProduct(newProductSelected);
  };

  useEffect(() => {
    dispatch(getProductById(product_id));
  }, [dispatch, product_id]);

  useEffect(() => {
    if (product) {
      setSelectedProduct({
        id_product: product.id_product,
        brand: product.brand,
        price: product.price,
        model: product.model,
        img: product.products && product.products[0].img,
        sizes: product.products && product.products[0].sizes,
        id_product_list: product.products && product.products[0].id_product_list,
      });
    }
  }, [product]);

  useEffect(() => {
    if (selectedProduct) {
      const imgs = document.getElementsByClassName('detail-body-info-colors');
      const imgArray = Array.from(imgs);

      const found = imgArray.find(i => i.id == selectedProduct.img);

      if (found) found.className = 'detail-body-info-colors img-selected';
    }
  }, [selectedProduct]);

  if (!product) {
    return (
      <main className='detail'>
        <section className='detail-header'>
          <Link className='detail-header-link' to='/'>
            Inicio
          </Link>
          <span className='detail-header-bar'>/</span>
          <Link className='detail-header-link' to='/productos'>
            Productos
          </Link>
          <span className='detail-header-bar'>/</span>
          <h1 className='detail-header-title'>{selectedProduct.model ? selectedProduct.model : 'Detalle'}</h1>
        </section>
        <section className='detail-body'>
          <p style={{ height: '40vh', letterSpacing: '1px' }}>Lo siento, no hemos encontrado tu producto</p>
        </section>
      </main>
    );
  }

  if (loading || selectedProduct === null) {
    return <Spinner />;
  }

  return (
    <main className='detail'>
      <section className='detail-header'>
        <Link className='detail-header-link' to='/'>
          Inicio
        </Link>
        <span className='detail-header-bar'>/</span>
        <Link className='detail-header-link' to='/productos'>
          Productos
        </Link>
        <span className='detail-header-bar'>/</span>
        <h1 className='detail-header-title'>{selectedProduct.model}</h1>
      </section>
      <section className='detail-body'>
        <div>
          <img className='detail-body-img' src={selectedProduct.img} alt='Calzado' />
        </div>
        <div className='detail-body-info'>
          <h2>{selectedProduct.model}</h2>
          <p>
            $ {formatPrice(product.price)}
            <small className='mt-2'>
              {' '}
              (O hasta 3 cuotas sin interés de <b>${formatPrice(selectedProduct.price / 3)}</b>)
            </small>
          </p>

          <label>Colores</label>
          <div className='detail-body-info-colors'>
            {product.products &&
              product.products.map(p => {
                return <img onClick={e => handleSelectProduct(e)} key={p.img} id={p.img} className='detail-body-info-colors' src={p.img} alt='Calzado' />;
              })}
          </div>
          <label>Talles</label>
          <div className='detail-body-info-sizes'>
            {selectedProduct.sizes &&
              selectedProduct.sizes.map(s => {
                return (
                  <button className='detail-body-info-sizes-buttons' value={s} onClick={e => selectSize(e)} key={s}>
                    {s}
                  </button>
                );
              })}
          </div>
          <label>Cantidad</label>
          <div className='detail-body-info-buttons'>
            <button onClick={() => restQuantity()} className='detail-body-info-actions'>
              -
            </button>
            <input id='detail-quantity' type='number' value={quantity} min={1} readOnly={true} />
            <button onClick={() => addQuantity()} className='detail-body-info-actions'>
              +
            </button>
          </div>
          <button onClick={() => addProductToCart()} className='detail-body-info-add'>
            AGREGAR AL CARRITO
          </button>
        </div>
      </section>
    </main>
  );
}
