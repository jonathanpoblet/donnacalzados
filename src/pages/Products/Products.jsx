import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';
import { products } from '../../test/all';
import { colors } from '../../test/colors';
import { models } from '../../test/models';
import { sizes } from '../../test/sizes';

import './products.css';

export default function Products() {
  return (
    <main className='products fade-in'>
      <ProductsHeader />
      <ProductsBody products={products} sizes={sizes} models={models} colors={colors} />
    </main>
  );
}
