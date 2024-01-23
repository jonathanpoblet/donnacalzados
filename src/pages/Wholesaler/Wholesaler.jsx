import React from 'react';
import WholesalerBody from '../../components/Wholesaler/WholesalerBody/WholesalerBody';
import WholesalerHeader from '../../components/Wholesaler/WholesalerHeader/WholesalerHeader';

import './wholesaler.css';

export default function Wholesaler() {
  return (
    <main className='wholesaler fade-in'>
      <WholesalerHeader />
      <WholesalerBody />
    </main>
  );
}
