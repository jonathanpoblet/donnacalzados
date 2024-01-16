import React from 'react';
import { FaSearch } from 'react-icons/fa';

import './products.css';

export default function Products() {
  return (
    <main className='products'>
      <h1 className='products-title'>Calzados</h1>
      <div className='products-search'>
        <input className='products-search-input' type='text' placeholder='Buscar' />
        <FaSearch className='products-search-icon' />
      </div>
    </main>
  );
}
