import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';
import { productsTest } from '../../test/allTest';
import { colors } from '../../test/colors';
import { brands } from '../../test/brand';
import { sizes } from '../../test/sizes';

import './products.css';

export default function Products() {
  return (
    <main className='products fade-in'>
      <ProductsHeader />
      <ProductsBody products={productsTest} sizes={sizes} brands={brands} colors={colors} />
    </main>
  );
}
