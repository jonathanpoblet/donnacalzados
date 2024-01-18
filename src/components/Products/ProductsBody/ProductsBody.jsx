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

  const [tempProducts, setTempProducts] = useState(
    products.filter(prod => {
      const capitalizedQueryPerson = queryPerson.charAt(0).toUpperCase() + queryPerson.slice(1);
      return prod.person[0] === capitalizedQueryPerson || prod.person[1] === capitalizedQueryPerson || prod.person[2] === capitalizedQueryPerson;
    })
  );
  const toggleCategory = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(s => s !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

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
  }, [window.location.href]);

  useEffect(() => {
    if (queryPerson === 'hombre') {
      setSizes(['35', '36', '37', '38', '39', '40', '41', '42', '43', '44']);
      setCategories(['ZAPATILLAS', 'OJOTAS']);
    } else if (queryPerson === 'mujer') {
      setSizes(['35', '36', '37', '38', '39', '40']);
      setCategories(['ZAPATILLAS', 'SANDALIAS', 'OJOTAS']);
    } else if (queryPerson === 'niño') {
      setSizes(['27', '28', '29', '30', '31', '32', '33', '34']);
      setCategories(['ZAPATILLAS', 'OJOTAS']);
    }
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedPriceRange([]);
    setTempProducts(
      products.filter(prod => {
        const capitalizedQueryPerson = queryPerson.charAt(0).toUpperCase() + queryPerson.slice(1);
        return prod.person[0] === capitalizedQueryPerson || prod.person[1] === capitalizedQueryPerson || prod.person[2] === capitalizedQueryPerson;
      })
    );
  }, [queryPerson]);

  return (
    <section className='products-body'>
      <article className='products-filter'>
        <div className='products-filter-header'>
          <h2 className='products-filter-header-title'>Filtrar por</h2>
          <div className='products-filter-header-filters'> </div>
        </div>
        <div className='products-filter-container'>
          <div className='products-filter-container-type'>
            <h3>Calzado</h3>
            <div>
              {categories.map(cat => (
                <button key={cat} className={`size-option ${selectedCategories.includes(cat) ? 'selected' : ''}`} onClick={() => toggleCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
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
              <button className={`price-option ${selectedPriceRange.includes('- $15.000') ? 'selected' : ''}`} onClick={() => togglePrice('- $15.000')}>
                - $15.000
              </button>
              <button className={`price-option ${selectedPriceRange.includes('$15.000 - $25.000') ? 'selected' : ''}`} onClick={() => togglePrice('$15.000 - $25.000')}>
                $15.000 - $25.000
              </button>
              <button className={`price-option ${selectedPriceRange.includes('+ $25.000') ? 'selected' : ''}`} onClick={() => togglePrice('+ $25.000')}>
                + $25.000
              </button>
            </div>
          </div>
        </div>
      </article>
      <article className='products-all'>
        {tempProducts.map((prod, index) => {
          return (
            <div className='products-all-card' key={index}>
              <img className='products-all-card-img' src={prod.img} alt='Producto' />
              <p className='products-all-card-title'>{prod.title.toLocaleUpperCase()}</p>
              <p className='products-all-card-price'>${formatPrice(prod.price)}</p>
            </div>
          );
        })}
      </article>
    </section>
  );
}
