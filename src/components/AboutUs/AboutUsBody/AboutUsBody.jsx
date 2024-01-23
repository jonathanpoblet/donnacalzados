import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';

import './aboutUsBody.css';

export default function AboutUsBody() {
  return (
    <section className='aboutUs-body'>
      <h2>SOBRE NOSOTROS</h2>
      <p>
        En Donna Calzados, nos enorgullece ofrecer más de una década de experiencia en el mundo del calzado, combinando elegancia y comodidad para cada cliente. Somos una empresa comprometida con la calidad y la moda, proporcionando una amplia gama de zapatillas, sandalias y ojotas para hombres,
        mujeres y niños.
      </p>
      <br />
      <p>
        Te invitamos a explorar nuestro catálogo en constante evolución, donde encontrarás opciones para toda la familia. Desde las últimas zapatillas que marcan tendencia hasta las sandalias más cómodas y las ojotas para los más pequeños, en Donna Calzados, siempre encontrarás algo que se adapte a
        tu estilo de vida.
      </p>
      <h2>¿POR QUE CONFIAR EN NOSOTROS?</h2>
      <p>
        ​En Donna Calzados te garantizamos la seguridad de todas tus compras online, manteniendo tus datos bajo la más estricta confidencialidad. Te aseguramos cada transacción electrónica que realices en nuestra página web. Tu información personal será cifrada y no podrá ser leída ni utilizada por
        terceros mientras realices una compra. A su vez, Donna Calzados te asegura que dichos datos no saldrán de la compañía, manejándolos con total responsabilidad, de manera absolutamente confidencial y conforme a lo dispuesto por la legislación vigente.
      </p>
      <h2>ENVÍOS</h2>
      <ul>
        <li>Los envíos se realizan a todo el país mediante Correo Argentino a los 8 - 10 días pasados el día de compra.</li>
        <li>Una vez despachada su compra le enviaremos un correo con el número de Guía del pedido, de esta manera podrás realizar el seguimiento del estado del pedido en cualquier momento que lo desee.</li>
      </ul>
      <h2>MÉTODOS DE PAGO</h2>
      <ul>
        <li>Mercado pago</li>
        <li>Tarjeta de débito (Visa - Mastercard - Maestro - Cabal)</li>
        <li>Tarjeta de crédito (Visa - Mastercard - American Express - Diners Club - Naranja - Cabal - Cencosud - Argencard - CMR)</li>
      </ul>
      <h2>POLÍTICA DE CAMBIOS</h2>
      <p>Como nuestro principal objetivo es que estés satisfecho con tu compra, te ofrecemos 10 días para poder realizar el cambio de tus productos en forma gratuita, ante las siguientes situaciones:</p>
      <ul>
        <li>Me queda chico / grande / recibí algo que no pedí: recibirás en forma gratuita el mismo producto en el talle que solicites.</li>
        <li>Si no contamos con stock del talle solicitado se puede pedir reintegro de dinero.</li>
        <li>Producto defectuoso antes de usarse: en caso que recibas un producto con alguna falla o defecto podés optar por el reemplazo.</li>
      </ul>
      <p>Para la correcta gestión de los cambios, te solicitamos realizarlos a traves de nuestro WhatsApp: 11 5046-0184 . Envianos el motivo del reclamo y el número de pedido</p>
      <br />
      <div>
        <FaWhatsapp onClick={() => window.open('https://wa.me/1150460184', '_blank')} />
        <FaInstagram onClick={() => window.open('https://www.instagram.com/donnacalzadosymoda/', '_blank')} />
        <FaFacebook onClick={() => window.open('https://www.facebook.com/donnaflores20', '_blank')} />
      </div>
    </section>
  );
}
