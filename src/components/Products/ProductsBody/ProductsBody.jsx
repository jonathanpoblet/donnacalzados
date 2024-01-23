import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../../utils/formatPrice';

import './productsBody.css';
import { setDetail } from '../../../app/state/detailSlice';

export default function ProductsBody({ products, sizes, models, categories, colors, person }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [tempProducts, setTempProducts] = useState(products);

  useEffect(() => {
    const filteredProducts = products
      .filter(prod => {
        const meetsModel = selectedModels.length === 0 || selectedModels.includes(prod.model);
        const meetsSize = selectedSizes.length === 0 || selectedSizes.some(size => prod.size.includes(size));
        const meetsColor = selectedColors.length === 0 || selectedColors.some(selectedColor => prod.color.some(prodColor => selectedColor === prodColor));

        return meetsModel && meetsSize && meetsColor;
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price;
        } else if (sortOrder === 'desc') {
          return b.price - a.price;
        } else {
          return 0;
        }
      });

    setTempProducts(filteredProducts);
  }, [selectedModels, selectedSizes, selectedColors, sortOrder]);

  const handleDetail = prod => {
    dispatch(setDetail(prod));
    navigate(`/detalle?producto=${prod.id}&persona=${person.toLocaleLowerCase()}`);
  };

  const toggleSelection = (selectedArray, value) => {
    if (selectedArray.includes(value)) {
      return selectedArray.filter(s => s !== value);
    } else {
      return [...selectedArray, value];
    }
  };

  const toggleFilter = (filterType, value) => {
    switch (filterType) {
      case 'models':
        setSelectedModels(toggleSelection(selectedModels, value));
        break;
      case 'sizes':
        setSelectedSizes(toggleSelection(selectedSizes, value));
        break;
      case 'colors':
        setSelectedColors(toggleSelection(selectedColors, value));
        break;
      case 'sort':
        setSortOrder(value);
        break;
      default:
        break;
    }
  };

  const showFilters = () => {
    const display = document.getElementById('filter-container').style.display;
    if (display === 'flex') document.getElementById('filter-container').style.display = 'none';
    else document.getElementById('filter-container').style.display = 'flex';
  };

  return (
    <section className='products-body'>
      <article className='products-filter'>
        <div className='products-filter-header'>
          <h2 className='products-filter-header-title'>Filtrar por</h2>
          <button id='filter-button' onClick={() => showFilters()}>
            Filtros
          </button>
        </div>
        <div className='products-filter-container' id='filter-container'>
          <div className='products-filter-container-type'>
            <h3>Modelos</h3>
            <div>
              {models.map(mod => (
                <button key={mod} className={`size-option ${selectedModels.includes(mod) ? 'selected' : ''}`} onClick={() => toggleFilter('models', mod)}>
                  {mod}
                </button>
              ))}
            </div>
          </div>

          <div className='products-filter-container-size'>
            <h3>Talle</h3>
            <div>
              {sizes.map(s => (
                <button key={s} className={`size-option ${selectedSizes.includes(s) ? 'selected' : ''}`} onClick={() => toggleFilter('sizes', s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className='products-filter-container-color'>
            <h3>Color</h3>
            <div>
              {colors.map(c => (
                <div key={c.name} className={`color-option ${selectedColors.includes(c.name) ? 'selected' : ''}`} style={{ backgroundColor: c.color }} onClick={() => toggleFilter('colors', c.name)}></div>
              ))}
            </div>
          </div>
          <div className='products-filter-container-price'>
            <h3>Precio</h3>
            <div>
              <button className={`price-option ${sortOrder === 'asc' ? 'selected' : ''}`} onClick={() => toggleFilter('sort', 'asc')}>
                Menor a Mayor Precio
              </button>
              <button className={`price-option ${sortOrder === 'desc' ? 'selected' : ''}`} onClick={() => toggleFilter('sort', 'desc')}>
                Mayor a Menor Precio
              </button>
            </div>
          </div>
        </div>
      </article>

      <article className='products-all'>
        {tempProducts.length !== 0 ? (
          tempProducts.map((prod, index) => (
            <div className='products-all-card' key={index}>
              <img className='products-all-card-img' src={prod.img} alt='Producto' onClick={() => handleDetail(prod)} />
              <p className='products-all-card-title'>{prod.model.toLocaleUpperCase()}</p>
              <p className='products-all-card-price'>
                <b>${formatPrice(prod.price)}</b>
              </p>
              <p className='products-all-card-price products-all-card-price2'>
                <b>3</b> cuotas sin interés <b>${formatPrice(prod.price / 3)}</b>
              </p>
              <button className='products-all-card-button'>AGREGAR AL CARRITO</button>
            </div>
          ))
        ) : (
          <p className='products-all-notfound'>No se encontraron productos con los filtros seleccionados</p>
        )}
      </article>
    </section>
  );
}
