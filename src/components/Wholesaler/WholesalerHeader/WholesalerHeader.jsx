import { Link } from 'react-router-dom';

import './wholesalerHeader.css';

export default function WholesalerHeader() {
  return (
    <section className='wholesaler-header'>
      <Link className='wholesaler-header-link' to='/'>
        Inicio
      </Link>
      <span className='wholesaler-header-bar'>/</span>
      <h1 className='wholesaler-header-title'>Compras Mayoristas</h1>
    </section>
  );
}
