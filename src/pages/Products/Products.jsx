import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../app/state/productsSlice';

import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';
import Spinner from '../../components/Spinner/Spinner';

import { colors } from '../../test/colors';
import { brands } from '../../test/brand';
import { sizes } from '../../test/sizes';

import './products.css';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, products]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className='products fade-in'>
      <ProductsHeader />
      <ProductsBody products={products} sizes={sizes} brands={brands} colors={colors} />
    </main>
  );
}
