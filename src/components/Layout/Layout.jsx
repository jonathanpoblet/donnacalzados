import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

import './layout.css';

export default function Layout({ children }) {
  return (
    <div className='fade-in' id='layout'>
      <Header />
      {children}
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
