import { BsFillTelephoneFill, BsFillEnvelopeFill, BsInstagram, BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

import './footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  const cards = [
    '/assets/payments/payment1.png',
    '/assets/payments/payment2.png',
    '/assets/payments/payment3.png',
    '/assets/payments/payment4.png',
    '/assets/payments/payment5.png',
    '/assets/payments/payment6.png',
    '/assets/payments/payment7.png',
    '/assets/payments/payment8.png',
    '/assets/payments/payment9.png',
    '/assets/payments/payment10.png',
    '/assets/payments/payment11.png',
    '/assets/payments/payment12.png',
    '/assets/payments/payment13.png',
  ];
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-container-div'>
          <h5 className='footer-container-div-title'>NAVEGACIÓN</h5>
          <ul className='footer-container-div-list'>
            <li className='footer-container-div-list-item'>
              <Link className='footer-container-div-list-item-link' to='./'>
                Inicio
              </Link>
            </li>
            <li className='footer-container-div-list-item'>
              <Link className='footer-container-div-list-item-link' to='./productos'>
                Productos
              </Link>
            </li>
            <li className='footer-container-div-list-item'>
              <Link className='footer-container-div-list-item-link' to='./nosotros'>
                Nosotros
              </Link>
            </li>
            <li className='footer-container-div-list-item'>
              <Link className='footer-container-div-list-item-link' to='./compras-mayoristas'>
                Compras Mayoristas
              </Link>
            </li>
          </ul>
        </div>
        <div className='footer-container-div'>
          <h5 className='footer-container-div-title'>MÉTODOS DE PAGO</h5>
          <ul className='footer-container-div-payment'>
            {cards.map(c => {
              return (
                <li key={c} className='footer-container-div-payment-item'>
                  <img src={c} alt='Método de Pago' />
                </li>
              );
            })}
          </ul>
        </div>
        <div className='footer-container-div'>
          <h5 className='footer-container-div-title'>CONTACTO</h5>
          <ul className='footer-container-div-list'>
            <li className='footer-container-div-list-item'>
              <BsFillTelephoneFill className='footer-container-div-list-item-icon' />
              <h4 className='footer-container-div-list-item-info'>11 5046-0184</h4>
            </li>
            <li className='footer-container-div-list-item'>
              <MdLocationOn className='footer-container-div-list-item-icon' />
              <h4 className='footer-container-div-list-item-info'>Buenos Aires, Argentina</h4>
            </li>
            <li className='footer-container-div-list-item'>
              <BsFillEnvelopeFill className='footer-container-div-list-item-icon' />
              <h4 className='footer-container-div-list-item-info'>contacto.donnacalzados@gmail.com</h4>
            </li>
          </ul>
        </div>
      </div>

      <div className='footer-copyright'>
        <div className='footer-copyright-container'>
          <p>© 2024 Copyright Donna Calzados</p>
          <div>
            <BsWhatsapp onClick={() => window.open('https://wa.me/541150460184', '_blank')} />
            <BsInstagram onClick={() => window.open('https://www.instagram.com/donnacalzadosymoda/', '_blank')} />
            <BsFacebook onClick={() => window.open('https://www.facebook.com/donnaflores20', '_blank')} />
          </div>
        </div>
      </div>
    </footer>
  );
}
