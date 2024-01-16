import { BsFillTelephoneFill, BsFillEnvelopeFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';

import './footer.css';

export default function Footer() {
  return (
    <>
      <footer id='footer' className='footer'>
        <div className='footer-container'>
          <div className='footer-container-info'>
            <MdLocationOn className='footer-container-info-icon' />
            <h4 className='footer-container-info-text'>Buenos Aires, Argentina</h4>
          </div>
          <div className='footer-container-info'>
            <BsFillEnvelopeFill className='footer-container-info-icon' />
            <h4 className='footer-container-info-text'>donnacalzados@gmail.com</h4>
          </div>
          <div className='footer-container-info'>
            <BsFillTelephoneFill className='footer-container-info-icon' />
            <h4 className='footer-container-info-text'>11 5046-0184</h4>
          </div>
        </div>
      </footer>

      <div className='autor'>
        <p className='autor-texto'>®2024 Donna Calzados</p>
      </div>
    </>
  );
}
