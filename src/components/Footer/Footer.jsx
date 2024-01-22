import { BsFillTelephoneFill, BsFillEnvelopeFill, BsInstagram, BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

import './footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='page-footer font-small blue pt-4'>
      <div className='container-fluid text-center text-md-left py-3'>
        <div className='row'>
          <div className='col-md-4 mb-md-0 mb-3 footer-container1'>
            <h5 className='text-uppercase text-white'>NAVEGACIÓN</h5>
            <ul className='list-unstyled d-flex flex-column justify-content-center'>
              <li className='d-flex flex-row align-items-center justify-content-center ms-md-3 my-2 text-start'>
                <Link className='footer-link' to='./'>
                  Inicio
                </Link>
              </li>
              <li className='d-flex flex-row align-items-center justify-content-center ms-md-3 my-2 text-start'>
                <Link className='footer-link' to='./hombre'>
                  Hombre
                </Link>
              </li>
              <li className='d-flex flex-row align-items-center justify-content-center ms-md-3 my-2 text-start'>
                <Link className='footer-link' to='./mujer'>
                  Mujer
                </Link>
              </li>
              <li className='d-flex flex-row align-items-center justify-content-center ms-md-3 my-2 text-start'>
                <Link className='footer-link' to='./niño'>
                  Niño/a
                </Link>
              </li>
              <li className='d-flex flex-row align-items-center justify-content-center ms-md-3 my-2 text-start'>
                <Link className='footer-link' to='./informacion'>
                  Información
                </Link>
              </li>
            </ul>
          </div>

          <div className='col-md-4 mb-md-0 mb-3 footer-container2'>
            <h5 className='text-uppercase text-start text-white'>CONTACTO</h5>
            <ul className='list-unstyled'>
              <li className='d-flex flex-row align-items-center my-4'>
                <MdLocationOn className='footer-container-info-icon me-2' />
                <h4 className='footer-container-info-text'>Buenos Aires, Argentina</h4>
              </li>
              <li className='d-flex flex-row align-items-center my-4'>
                <BsFillEnvelopeFill className='footer-container-info-icon me-2' />
                <h4 className='footer-container-info-text'>donnacalzados@gmail.com</h4>
              </li>
              <li className='d-flex flex-row align-items-center my-4'>
                <BsFillTelephoneFill className='footer-container-info-icon me-2' />
                <h4 className='footer-container-info-text'>11 5046-0184</h4>
              </li>
            </ul>
          </div>
          <div className='col-md-4 mb-md-0 mb-3 footer-container3'>
            <h5 className='text-uppercase text-start text-white'>REDES</h5>
            <ul className='list-unstyled'>
              <li className='d-flex flex-row align-items-center my-4'>
                <BsWhatsapp onClick={() => window.open('https://wa.me/1150460184', '_blank')} className='footer-container-info-icon me-3' />
                <BsInstagram onClick={() => window.open('https://www.instagram.com/donnacalzadosymoda/', '_blank')} className='footer-container-info-icon me-3' />
                <BsFacebook onClick={() => window.open('https://www.facebook.com/donnaflores20', '_blank')} className='footer-container-info-icon me-3' />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className='footer-copyright text-center py-3 bg-black text-white'>
        © 2024 Copyright Donna Calzados | Desarrollado por <span onClick={() => window.open('https://www.instagram.com/virtual.designs.ar/', '_blankc')}>Virtual Designs</span>
      </div>
    </footer>
  );
}
