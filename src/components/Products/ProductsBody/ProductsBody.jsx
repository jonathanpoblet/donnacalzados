import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProductsAll from '../ProductsAll/ProductsAll';

import { RxCross1 } from 'react-icons/rx';

import './productsBody.css';

export default function ProductsBody({ products, sizes, models, colors }) {
  const [show, setShow] = useState(false);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [tempProducts, setTempProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const toggleSelection = (selectedArray, value) => {
    if (selectedArray.includes(value)) {
      return selectedArray.filter(s => s !== value);
    } else {
      return [...selectedArray, value];
    }
  };

  const toggleFilter = (filterType, value, filterName) => {
    switch (filterType) {
      case 'models':
        setSelectedModels(prevModels => toggleSelection(prevModels, value));
        break;
      case 'sizes':
        setSelectedSizes(prevSizes => toggleSelection(prevSizes, value));
        break;
      case 'colors':
        setSelectedColors(prevColors => toggleSelection(prevColors, value));
        break;
      case 'sort':
        // Manejar de manera exclusiva los filtros de precio
        if (value === 'asc' || value === 'desc') {
          // Si es un filtro de precio, deseleccionar el filtro de precio opuesto
          setSortOrder(prevSortOrder => (prevSortOrder === value ? '' : value));
          const oppositeSortOrder = value === 'asc' ? 'desc' : 'asc';
          setSelectedFilters(prevFilters => prevFilters.filter(filter => filter.filterType !== 'sort' || filter.value !== oppositeSortOrder));
        } else {
          // Si no es un filtro de precio, manejar como antes
          setSortOrder(prevSortOrder => (prevSortOrder === value ? '' : value));
          const selectedFilter = { filterType, value, filterName };
          if (selectedFilters.some(filter => filter.filterType === filterType && filter.value === value)) {
            setSelectedFilters(prevFilters => prevFilters.filter(filter => !(filter.filterType === filterType && filter.value === value)));
          } else {
            setSelectedFilters(prevFilters => [...prevFilters, selectedFilter]);
          }
        }
        break;
      default:
        break;
    }

    const selectedFilter = { filterType, value, filterName };
    if (selectedFilters.some(filter => filter.filterType === filterType && filter.value === value)) {
      setSelectedFilters(prevFilters => prevFilters.filter(filter => !(filter.filterType === filterType && filter.value === value)));
    } else {
      setSelectedFilters(prevFilters => [...prevFilters, selectedFilter]);
    }
  };

  const removeFilter = filter => {
    switch (filter.filterType) {
      case 'models':
        setSelectedModels(prevModels => toggleSelection(prevModels, filter.value));
        break;
      case 'sizes':
        setSelectedSizes(prevSizes => toggleSelection(prevSizes, filter.value));
        break;
      case 'colors':
        setSelectedColors(prevColors => toggleSelection(prevColors, filter.value));
        break;
      case 'sort':
        setSortOrder('');
        break;
      default:
        break;
    }

    setSelectedFilters(prevFilters => prevFilters.filter(f => f !== filter));
  };

  return (
    <>
      {window.innerWidth > 992 && (
        <div className='selected-filters-container'>
          {selectedFilters.map((filter, index) => (
            <div key={index} className='filter-card' onClick={() => removeFilter(filter)}>
              {filter.filterName}: {filter.value} <RxCross1 />
            </div>
          ))}
        </div>
      )}
      <section className='products-body'>
        <article className='products-filter'>
          <div className='products-filter-header'>
            <h2 className='products-filter-header-title'>Filtrar por</h2>

            <Button variant='dark' className='d-md-block d-lg-none' onClick={handleShow}>
              Filtros
            </Button>

            {window.innerWidth <= 992 && (
              <div className='selected-filters-container'>
                {selectedFilters.map((filter, index) => (
                  <div key={index} className='filter-card' onClick={() => removeFilter(filter)}>
                    {filter.filterName}: {filter.value} <RxCross1 />
                  </div>
                ))}
              </div>
            )}

            <Offcanvas style={{ width: '100%' }} show={show} onHide={handleClose} className='d-lg-none' responsive='lg'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filtros</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className='products-filter-container-mobile'>
                  <div className='products-filter-container-mobile-type'>
                    <h3>Modelos</h3>
                    <div>
                      {models.map(mod => (
                        <button key={mod} className={`size-option ${selectedModels.includes(mod) ? 'selected' : ''}`} onClick={() => toggleFilter('models', mod, 'Modelo')}>
                          {mod}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className='products-filter-container-mobile-size'>
                    <h3>Talle</h3>
                    <div>
                      {sizes.map(s => (
                        <button key={s} className={`size-option ${selectedSizes.includes(s) ? 'selected' : ''}`} onClick={() => toggleFilter('sizes', s, 'Talle')}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className='products-filter-container-mobile-color'>
                    <h3>Color</h3>
                    <div>
                      {colors.map(c => (
                        <div
                          key={c.name}
                          className={`color-option ${selectedColors.includes(c.name) ? 'selected' : ''}`}
                          style={{ backgroundColor: c.color }}
                          onClick={() => toggleFilter('colors', c.name, 'Color')}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className='products-filter-container-mobile-price'>
                    <h3>Precio</h3>
                    <div>
                      <button className={`price-option ${sortOrder === 'asc' ? 'selected' : ''}`} onClick={() => toggleFilter('sort', 'asc', 'Precio')}>
                        Menor a Mayor Precio
                      </button>
                      <button className={`price-option ${sortOrder === 'desc' ? 'selected' : ''}`} onClick={() => toggleFilter('sort', 'desc', 'Precio')}>
                        Mayor a Menor Precio
                      </button>
                    </div>
                  </div>
                  <Button variant='dark' onClick={handleClose} style={{ letterSpacing: '1px', fontSize: '12px' }}>
                    CONFIRMAR FILTROS
                  </Button>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </div>

          <div className='products-filter-container' id='filter-container'>
            <div className='products-filter-container-type'>
              <h3>Modelos</h3>
              <div>
                {models.map(mod => (
                  <button key={mod} className={`size-option ${selectedModels.includes(mod) ? 'selected' : ''}`} onClick={() => toggleFilter('models', mod, 'Modelo')}>
                    {mod}
                  </button>
                ))}
              </div>
            </div>

            <div className='products-filter-container-size'>
              <h3>Talle</h3>
              <div>
                {sizes.map(s => (
                  <button key={s} className={`size-option ${selectedSizes.includes(s) ? 'selected' : ''}`} onClick={() => toggleFilter('sizes', s, 'Talle')}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className='products-filter-container-color'>
              <h3>Color</h3>
              <div>
                {colors.map(c => (
                  <div
                    key={c.name}
                    className={`color-option ${selectedColors.includes(c.name) ? 'selected' : ''}`}
                    style={{ backgroundColor: c.color }}
                    onClick={() => toggleFilter('colors', c.name, 'Color')}
                  ></div>
                ))}
              </div>
            </div>
            <div className='products-filter-container-price'>
              <h3>Precio</h3>
              <div>
                <button className={`price-option ${sortOrder === 'asc' ? 'selected' : ''}`} onClick={() => toggleFilter('sort', 'asc', 'Precio')}>
                  Menor a Mayor Precio
                </button>
                <button className={`price-option ${sortOrder === 'desc' ? 'selected' : ''}`} onClick={() => toggleFilter('sort', 'desc', 'Precio')}>
                  Mayor a Menor Precio
                </button>
              </div>
            </div>
          </div>
        </article>

        <ProductsAll products={tempProducts} />
      </section>
    </>
  );
}
