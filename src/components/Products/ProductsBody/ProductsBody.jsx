import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../../../test/products';
import { colors } from '../../../test/colors';
import { formatPrice } from '../../../utils/formatPrice';

import './productsBody.css';

export default function ProductsBody() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [queryPerson, setQueryPerson] = useState(params.get('p'));
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [tempProducts, setTempProducts] = useState([]);

  useEffect(() => {
    setQueryPerson(params.get('p'));
  }, [window.location.href]);

  useEffect(() => {
    if (queryPerson === 'hombre') {
      setSizes(['35', '36', '37', '38', '39', '40', '41', '42', '43', '44']);
      setCategories(['Zapatilla', 'Ojotas']);
    } else if (queryPerson === 'mujer') {
      setSizes(['35', '36', '37', '38', '39', '40']);
      setCategories(['Zapatilla', 'Sandalia', 'Ojotas']);
    } else if (queryPerson === 'niño') {
      setSizes(['27', '28', '29', '30', '31', '32', '33', '34']);
      setCategories(['Zapatilla', 'Ojotas']);
    }
  }, [queryPerson]);

  useEffect(() => {
    const filteredProducts = products.filter(prod => {
      const meetsCategory = selectedCategories.length === 0 || selectedCategories.includes(prod.category);
      const meetsSize = selectedSizes.length === 0 || selectedSizes.some(size => prod.size.includes(size));
      const meetsColor = selectedColors.length === 0 || selectedColors.some(selectedColor => prod.color.some(prodColor => selectedColor === prodColor));
      const meetsPriceRange = selectedPriceRange.length === 0 || selectedPriceRange.some(range => isPriceInRange(prod.price, range));

      console.log(meetsCategory);
      console.log(meetsSize);
      console.log(meetsColor);
      console.log(meetsPriceRange);

      return meetsCategory && meetsSize && meetsColor && meetsPriceRange;
    });

    setTempProducts(filteredProducts);
  }, [selectedCategories, selectedSizes, selectedColors, selectedPriceRange]);

  const isPriceInRange = (price, range) => {
    const [min, max] = parsePriceRange(range);
    return price >= min && price <= max;
  };

  const parsePriceRange = range => {
    const [min, max] = range.split('-').map(value => parseInt(value.trim().replace('$', '').replace(',', ''), 10));

    return [min, max];
  };

  const toggleSelection = (selectedArray, value) => {
    console.log(selectedArray);
    console.log(value);
    if (selectedArray.includes(value)) {
      console.log(selectedArray.includes(value));
      return selectedArray.filter(s => s !== value);
    } else {
      return [...selectedArray, value];
    }
  };

  const toggleFilter = (filterType, value) => {
    console.log('Toggle Filter Called:', filterType, value);

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
      case 'price':
        const priceRanges = {
          '- $20.000': '0-20000',
          '+ $20.000': '20001-Infinity',
        };
        setSelectedPriceRange(toggleSelection(selectedPriceRange, priceRanges[value]));
        break;
      default:
        break;
    }
  };

  const showFilters = () => {
    const display = document.getElementById('filter-container').style.display;
    if (display == 'flex') document.getElementById('filter-container').style.display = 'none';
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
              <button className={`price-option ${selectedPriceRange.includes('- $20.000') ? 'selected' : ''}`} onClick={() => toggleFilter('price', '- $20.000')}>
                - $20.000
              </button>
              <button className={`price-option ${selectedPriceRange.includes('+ $20.000') ? 'selected' : ''}`} onClick={() => toggleFilter('price', '+ $20.000')}>
                + $20.000
              </button>
            </div>
          </div>
        </div>
      </article>
      <article className='products-all'>
        {tempProducts.map((prod, index) => (
          <div className='products-all-card' key={index}>
            <img className='products-all-card-img' src={prod.img} alt='Producto' />
            <p className='products-all-card-title'>{prod.title.toLocaleUpperCase()}</p>
            <p className='products-all-card-price'>${formatPrice(prod.price)}</p>
          </div>
        ))}
      </article>
    </section>
  );
}
