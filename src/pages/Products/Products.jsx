import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';
import { colors } from '../../test/colors';
import { productsMan } from '../../test/productsMan';

import './man.css';

export default function Products() {
  return (
    <main className='products fade-in'>
      <ProductsHeader />
      <ProductsBody products={productsMan} sizes={['35', '36', '37', '38', '39', '40', '41', '42', '43', '44']} categories={['Zapatilla', 'Ojotas']} colors={colors} person={'Hombre'} />
    </main>
  );
}
