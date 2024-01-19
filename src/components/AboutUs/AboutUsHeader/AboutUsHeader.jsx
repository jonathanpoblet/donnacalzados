import { Link } from 'react-router-dom';

import './aboutUsHeader.css';

export default function AboutUsHeader() {
  return (
    <section className='aboutUs-header'>
      <Link className='aboutUs-header-link' to='/'>
        Inicio
      </Link>
      <span className='aboutUs-header-bar'>/</span>
      <h1 className='aboutUs-header-title'>Nosotros</h1>
    </section>
  );
}
