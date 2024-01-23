import { Link } from 'react-router-dom';

import './productsHeader.css';

export default function ProductsHeader() {
  return (
    <section className='products-header'>
      <Link className='products-header-link' to='/'>
        Inicio
      </Link>
      <span className='products-header-bar'>/</span>
      <h1 className='products-header-title'>Productos</h1>
    </section>
  );
}
