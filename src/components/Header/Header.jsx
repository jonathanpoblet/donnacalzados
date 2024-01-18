import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

import './header.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.location.hash) {
      window.location.href = 'http://localhost:5173/donnacalzados/#';
    }
  }, [location.pathname, navigate]);
  return (
    <header className='text-center'>
      <p style={{ backgroundColor: '#000', color: '#fff', fontSize: 13, width: '100%', padding: '10px 5px' }}>ENVIOS A TODA LA ARGENTINA</p>
      <Navbar collapseOnSelect expand='lg' variant='light' className='w-100 justify-content-beetwen px-3 px-lg-5'>
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav'
          className='order-0 btn-light button-toggle'
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          }}
        />

        <Navbar.Brand href='/'>
          <img src='/donnacalzados/assets/logo.png' alt='Logo' className='navbar-img' />
        </Navbar.Brand>

        <Button variant='light' className='order-10 order-lg-2 ml-auto' style={{ backgroundColor: '#E54787' }} data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample'>
          <BsCart style={{ color: '#fff' }} />
        </Button>

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='d-flex justify-content-end ms-lg-5'>
            <Nav.Link onClick={() => navigate('/')} className='text mx-2'>
              INICIO
            </Nav.Link>
            <Nav.Link onClick={() => navigate('./productos?p=hombre')} className='text mx-2'>
              HOMBRE
            </Nav.Link>
            <Nav.Link onClick={() => navigate('./productos?p=mujer')} className='text mx-2'>
              MUJER
            </Nav.Link>
            <Nav.Link onClick={() => navigate('./productos?p=niño')} className='text mx-2'>
              NIÑO/A
            </Nav.Link>
            <Nav.Link onClick={() => navigate('./informacion')} className='text mx-2'>
              INFORMACIÓN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className='offcanvas offcanvas-start' tabIndex='-1' id='offcanvasExample' aria-labelledby='offcanvasExampleLabel'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasExampleLabel'>
            Carrito
          </h5>
          <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
        </div>
        <div className='offcanvas-body'>
          <div>Contenido del carrito</div>
        </div>
      </div>
    </header>
  );
}
