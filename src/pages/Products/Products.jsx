import React from 'react';
import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsFilter from '../../components/Products/ProductsFilter/ProductsFilter';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';

import './products.css';

export default function Products() {
  return (
    <main className='products'>
      <ProductsHeader />
      <ProductsBody />
    </main>
  );
}
