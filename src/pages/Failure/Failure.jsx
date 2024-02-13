import { MdOutlineErrorOutline } from 'react-icons/md';
import './failure.css';

export default function Success() {
  return (
    <main className='failure fade-in'>
      <section className='failure-section'>
        <MdOutlineErrorOutline />
        <p style={{ letterSpacing: '1px', fontSize: '15px', marginBottom: '50px', marginTop: '20px' }}>Ha ocurrido un error al procesar su compra. Por favor, intente nuevamente!</p>
      </section>
    </main>
  );
}
