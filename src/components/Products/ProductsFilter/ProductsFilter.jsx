import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './productsFilter.css';

export default function ProductsFilter() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [queryPerson, setQueryPerson] = useState(params.get('p'));
  const [queryCategory, setQueryCategory] = useState(params.get('calzado'));

  const [sizes, setSizes] = useState([]);

  const colors = ['#000', '#fff', '#EA1818', '#1965DB', '#EEE416', '#87DE19', '#C1811F'];

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);

  const toggleSize = size => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = color => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const togglePrice = range => {
    if (selectedPriceRange.includes(range)) {
      setSelectedPriceRange(selectedPriceRange.filter(r => r !== range));
    } else {
      setSelectedPriceRange([...selectedPriceRange, range]);
    }
  };

  useEffect(() => {
    setQueryPerson(params.get('p'));
    setQueryCategory(params.get('calzado'));
  }, [window.location.href]);

  useEffect(() => {
    if (queryPerson === 'hombre') {
      setSizes(['34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44']);
    } else if (queryPerson === 'mujer') {
      setSizes(['34', '35', '36', '37', '38', '39', '40', '41', '42']);
    } else if (queryPerson === 'niño') {
      setSizes(['27', '28', '29', '30', '31', '32', '33', '34']);
    }
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedPriceRange([]);
  }, [queryPerson, queryCategory]);

  return (
    <article className='products-filter'>
      <div className='products-filter-header'>
        <h2 className='products-filter-header-title'>Filtrar por</h2>
        <div className='products-filter-header-filters'> </div>
      </div>
      <div className='products-filter-container'>
        <div className='products-filter-container-size'>
          <h3>Talle</h3>
          <div>
            {sizes.map(s => (
              <button key={s} className={`size-option ${selectedSizes.includes(s) ? 'selected' : ''}`} onClick={() => toggleSize(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className='products-filter-container-color'>
          <h3>Color</h3>
          <div>
            {colors.map(c => (
              <div key={c} className={`color-option ${selectedColors.includes(c) ? 'selected' : ''}`} style={{ backgroundColor: c }} onClick={() => toggleColor(c)}></div>
            ))}
          </div>
        </div>
        <div className='products-filter-container-price'>
          <h3>Precio</h3>
          <div>
            <button className={`price-option ${selectedPriceRange.includes('- $10.000') ? 'selected' : ''}`} onClick={() => togglePrice('- $10.000')}>
              - $10.000
            </button>
            <button className={`price-option ${selectedPriceRange.includes('$10.000 - $18.000') ? 'selected' : ''}`} onClick={() => togglePrice('$10.000 - $18.000')}>
              10000-18000
            </button>
            <button className={`price-option ${selectedPriceRange.includes('+ $18.000') ? 'selected' : ''}`} onClick={() => togglePrice('+ $18.000')}>
              +18000
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
