import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './productsHeader.css';

export default function ProductsHeader({ person }) {
  return (
    <section className='products-header'>
      <Link className='products-header-link' to='/'>
        Inicio
      </Link>
      <span className='products-header-bar'>/</span>
      <h1 className='products-header-title'>{person}</h1>
    </section>
  );
}
