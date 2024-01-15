import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

import './header.css';

const Header = () => {
  return (
    <header className='text-center'>
      <p style={{ backgroundColor: '#000', color: '#fff', fontSize: 13, width: '100%', padding: '10px 5px' }}>ENVIOS A TODA LA ARGENTINA</p>
      <Navbar collapseOnSelect expand='lg' variant='light' className='w-100 justify-content-around'>
        {/* Icono de menú para pantallas pequeñas */}
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav'
          className='order-0 btn-light button-toggle'
          style={{
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
          }}
        />

        {/* Logo */}
        <Navbar.Brand href='/'>
          <img src='/assets/logo.png' alt='Logo' className='navbar-img' />
        </Navbar.Brand>

        {/* Icono de carrito */}
        <Button variant='light' className='order-10 order-lg-2 ml-auto' style={{ backgroundColor: '#f5e4ea' }} data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample'>
          <BsCart />
        </Button>

        {/* Contenido del menú colapsado */}
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='d-flex justify-content-end ms-lg-5'>
            <Nav.Link href='/' className='text-dark mx-2'>
              Inicio
            </Nav.Link>
            <Nav.Link href='/productos' className='text-dark mx-2'>
              Hombres
            </Nav.Link>
            <Nav.Link href='/productos' className='text-dark mx-2'>
              Mujeres
            </Nav.Link>
            <Nav.Link href='/productos' className='text-dark mx-2'>
              Niños
            </Nav.Link>
            <Nav.Link href='/contacto' className='text-dark mx-2'>
              Contacto
            </Nav.Link>
            <Nav.Link href='/informacion' className='text-dark mx-2'>
              Info
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Contenido del carrito en el offcanvas */}
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
};

export default Header;
