import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';
import useWindowSize from '../../utils/useWindowSize';
import './header.css';
import Cart from '../Cart/Cart';

export default function Header() {
  const cart = useSelector(state => state.cart);
  const location = useLocation();
  const navigate = useNavigate();

  const windowSize = useWindowSize();

  const handleNavLinkClick = ruta => {
    navigate(ruta);
  };

  const navLinks = [
    { key: 'inicio', label: 'INICIO', path: './', pathDesktop: './' },
    { key: 'productos', label: 'PRODUCTOS', path: './#productos', pathDesktop: '/productos' },
    { key: 'nosotros', label: 'NOSOTROS', path: './#nosotros', pathDesktop: '/nosotros' },
    { key: 'compras-mayoristas', label: 'COMPRAS MAYORISTAS', path: './#compras-mayoristas', pathDesktop: '/compras-mayoristas' },
  ];

  // useEffect(() => {
  //   if (!window.location.hash) {
  //     window.location.href = 'http://localhost:5173/donnacalzados/#';
  //   }
  // }, [location.pathname, navigate]);
  return (
    <header>
      <p style={{ backgroundColor: '#000', color: '#fff', fontSize: 13, width: '100%', padding: '10px 5px' }}>ENVIOS A TODA LA ARGENTINA</p>
      <Navbar collapseOnSelect expand='lg' variant='light' className='justify-content-beetwen '>
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav'
          className='order-0 btn-light button-toggle'
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            paddingLeft: 0,
          }}
        />

        <Navbar.Brand href='./'>
          <img src='/donnacalzados/assets/logo.png' alt='Logo' className='navbar-img' />
        </Navbar.Brand>

        <Button variant='light' className='order-10 order-lg-2 ml-auto' style={{ backgroundColor: '#E54787', position: 'relative' }} data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample'>
          <BsCart style={{ color: '#fff' }} />
          <p style={{ position: 'absolute', marginRight: '3px', right: 0, bottom: 0, top: 0, borderRadius: '20%', fontSize: '10px', color: '#fff', fontWeight: 700 }}>{cart.length ? cart.length : ''}</p>
        </Button>

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='d-flex justify-content-end ms-lg-5'>
            {navLinks.map(({ key, label, path, pathDesktop }) => (
              <React.Fragment key={key}>
                {windowSize.width <= 992 ? (
                  <Nav.Link href={path} className='mx-2'>
                    {label}
                  </Nav.Link>
                ) : (
                  <Nav.Link className='mx-2' onClick={() => handleNavLinkClick(pathDesktop)}>
                    {label}
                  </Nav.Link>
                )}
              </React.Fragment>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Cart />
    </header>
  );
}
