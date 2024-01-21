import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { formatPrice } from '../../../utils/formatPrice';

import './productsBody.css';
import { setDetail } from '../../../app/state/detailSlice';

export default function ProductsBody({ products, sizes, categories, colors, person }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [tempProducts, setTempProducts] = useState(products);

  useEffect(() => {
    const filteredProducts = products
      .filter(prod => {
        const meetsCategory = selectedCategories.length === 0 || selectedCategories.includes(prod.category);
        const meetsSize = selectedSizes.length === 0 || selectedSizes.some(size => prod.size.includes(size));
        const meetsColor = selectedColors.length === 0 || selectedColors.some(selectedColor => prod.color.some(prodColor => selectedColor === prodColor));

        return meetsCategory && meetsSize && meetsColor;
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
  }, [selectedCategories, selectedSizes, selectedColors, sortOrder]);

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
      case 'categories':
        setSelectedCategories(toggleSelection(selectedCategories, value));
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
            <h3>Calzado</h3>
            <div>
              {categories.map(cat => (
                <button key={cat} className={`size-option ${selectedCategories.includes(cat) ? 'selected' : ''}`} onClick={() => toggleFilter('categories', cat)}>
                  {cat}
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
            <div className='products-all-card' key={index} onClick={() => handleDetail(prod)}>
              <img className='products-all-card-img' src={prod.img} alt='Producto' />
              <p className='products-all-card-title'>{prod.title.toLocaleUpperCase()}</p>
              <p className='products-all-card-price'>${formatPrice(prod.price)}</p>
            </div>
          ))
        ) : (
          <p className='products-all-notfound'>No se encontraron productos con los filtros seleccionados</p>
        )}
      </article>
    </section>
  );
}
