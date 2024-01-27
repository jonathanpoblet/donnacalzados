import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ProductsAll from '../ProductsAll/ProductsAll';

import { RxCross1 } from 'react-icons/rx';

import './productsBody.css';

export default function ProductsBody({ products, sizes, brands }) {
  const [show, setShow] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [tempProducts, setTempProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const filteredProducts = products
      .filter(prod => {
        const meetsBrand = selectedBrands.length === 0 || selectedBrands.includes(prod.brand);
        const meetsSize = selectedSizes.length === 0 || selectedSizes.some(size => prod.products.some(product => product.sizes.includes(size)));

        return meetsBrand && meetsSize;
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
  }, [selectedBrands, selectedSizes, sortOrder]);

  const toggleSelection = (selectedArray, value) => {
    if (selectedArray.includes(value)) {
      return selectedArray.filter(s => s !== value);
    } else {
      return [...selectedArray, value];
    }
  };

  const toggleFilter = (filterType, value, filterName) => {
    switch (filterType) {
      case 'brands':
        setSelectedBrands(prevBrands => toggleSelection(prevBrands, value));
        break;
      case 'sizes':
        setSelectedSizes(prevSizes => toggleSelection(prevSizes, value));
        break;
      case 'sort':
        if (value === 'asc' || value === 'desc') {
          setSortOrder(prevSortOrder => (prevSortOrder === value ? '' : value));
          const oppositeSortOrder = value === 'asc' ? 'desc' : 'asc';
          setSelectedFilters(prevFilters => prevFilters.filter(filter => filter.filterType !== 'sort' || filter.value !== oppositeSortOrder));
        } else {
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
      case 'brands':
        setSelectedBrands(prevBrands => toggleSelection(prevBrands, filter.value));
        break;
      case 'sizes':
        setSelectedSizes(prevSizes => toggleSelection(prevSizes, filter.value));
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
                    <h3>Marcas</h3>
                    <div>
                      {brands.map(bra => (
                        <button key={bra} className={`size-option ${selectedBrands.includes(bra) ? 'selected' : ''}`} onClick={() => toggleFilter('brands', bra, 'Marca')}>
                          {bra}
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
              <h3>Marcas</h3>
              <div>
                {brands.map(bra => (
                  <button key={bra} className={`size-option ${selectedBrands.includes(bra) ? 'selected' : ''}`} onClick={() => toggleFilter('brands', bra, 'Marca')}>
                    {bra}
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
