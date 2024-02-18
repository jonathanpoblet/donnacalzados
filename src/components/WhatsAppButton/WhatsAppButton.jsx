import { BsWhatsapp } from 'react-icons/bs';

import './whatsAppButton.css';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://api.whatsapp.com/send?phone=541136791931&text=Hola,%20quiero%20consultar%20por%20un%20producto!', '_blank');
  };

  return <BsWhatsapp data='ture' className='whatsapp-button' onClick={handleClick}></BsWhatsapp>;
}
