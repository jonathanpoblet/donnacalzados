import React from 'react';
import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';

import './products.css';

export default function Products() {
  return (
    <main className='products fade-in'>
      <ProductsHeader />
      <ProductsBody />
    </main>
  );
}
