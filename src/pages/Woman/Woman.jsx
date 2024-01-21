import ProductsBody from '../../components/Products/ProductsBody/ProductsBody';
import ProductsHeader from '../../components/Products/ProductsHeader/ProductsHeader';
import { colors } from '../../test/colors';

import './woman.css';
import { productsWoman } from '../../test/productsWoman';

export default function Products() {
  return (
    <main className='woman fade-in'>
      <ProductsHeader person={'Mujer'} />
      <ProductsBody products={productsWoman} sizes={['35', '36', '37', '38', '39', '40']} categories={['Zapatilla', 'Sandalias', 'Ojotas']} colors={colors} person={'Mujer'} />
    </main>
  );
}
