import Header from '../Header/Header';

import './layout.css';

export default function Layout({ children }) {
  return (
    <div className='fade-in'>
      <Header />
      {children}
    </div>
  );
}
