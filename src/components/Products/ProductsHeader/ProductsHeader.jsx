import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './productsHeader.css';

export default function ProductsHeader() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [person, setPerson] = useState(params.get('p'));

  function upperCaseFirstChart(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(() => {
    setPerson(params.get('p'));
  }, [window.location.href]);

  return (
    <section className='products-header'>
      <Link className='products-header-link' to='/'>
        Inicio
      </Link>
      <span className='products-header-bar'>/</span>
      <h1 className='products-header-title'>{upperCaseFirstChart(person)}</h1>
    </section>
  );
}
