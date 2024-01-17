import React from 'react';
import ProductsAll from '../ProductsAll/ProductsAll';
import ProductsFilter from '../ProductsFilter/ProductsFilter';

import './productsBody.css';

export default function ProductsBody() {
  return (
    <section className='products-body'>
      <ProductsFilter />
      <ProductsAll />
    </section>
  );
}
