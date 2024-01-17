import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

import './productsHeader.css';

export default function ProductsHeader() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const [category, setCategory] = useState(params.get('calzado'));
  const [person, setPerson] = useState(params.get('p'));

  function upperCaseFirstChart(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  useEffect(() => {
    setCategory(params.get('calzado'));
    setPerson(params.get('p'));
  }, [window.location.href]);

  return (
    <section className='products-header'>
      <Link className='products-header-link' to='/'>
        Inicio
      </Link>
      <span className='products-header-bar'>/</span>
      <h1 className='products-header-title'>{upperCaseFirstChart(person)}</h1>
      <span className='products-header-bar'>/</span>
      <h2 className='products-header-title'>{upperCaseFirstChart(category)}</h2>
    </section>
  );
}
