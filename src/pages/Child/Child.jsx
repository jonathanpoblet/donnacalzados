import React from 'react';
import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';
import { colors } from '../../test/colors';
import { productsChild } from '../../test/productsChild';

import './child.css';

export default function Products() {
  return (
    <main className='child fade-in'>
      <ProductsHeader person={'Niño'} />
      <ProductsBody products={productsChild} sizes={['27', '28', '29', '30', '31', '32', '33', '34']} categories={['Zapatilla', 'Ojotas']} colors={colors} person={'Niño'} />
    </main>
  );
}
