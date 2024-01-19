import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import './layout.css';

export default function Layout({ children }) {
  return (
    <div className='fade-in' id='layout'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
