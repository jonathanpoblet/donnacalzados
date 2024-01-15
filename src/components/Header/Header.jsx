import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

import './header.css';

const Header = () => {
  return (
    <header className='text-center'>
      <p style={{ backgroundColor: '#f5e4ea', fontSize: 13 }} className='p-2'>
        ENVIOS A TODA LA ARGENTINA
      </p>
      <Navbar collapseOnSelect expand='lg' variant='light' className='d-flex flex-lg-column mb-4'>
        <div className='d-flex align-items-center justify-content-between w-100 px-3 py-2 d-lg-block my-lg-4'>
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
          <Navbar.Brand href='/' className='w-lg-100'>
            <img src='/assets/logo.png' alt='Logo' className='img-fluid text-lg-center' />
          </Navbar.Brand>

          {/* Icono de carrito */}
          <Button variant='light' className='order-2 ml-auto d-lg-none' data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample'>
            <BsCart />
          </Button>
        </div>

        {/* Desplegable y elementos de navegación */}
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto w-100'>
            <Nav.Link href='/' className='text-dark  mx-lg-5'>
              Inicio
            </Nav.Link>
            <Nav.Link href='/productos' className='text-dark  mx-lg-5'>
              Productos
            </Nav.Link>
            <Nav.Link href='/contacto' className='text-dark  mx-lg-5'>
              Contacto
            </Nav.Link>
            {/* Dropdown de prueba  */}
            {/* <NavDropdown title='Hombres' id='collasible-nav-dropdown' className='mx-lg-5'>
              <NavDropdown.Item href='#action1' className='custom-dropdown-item text-center'>
                Opción 1
              </NavDropdown.Item>
              <NavDropdown.Item href='#action2' className='custom-dropdown-item text-center'>
                Opción 2
              </NavDropdown.Item>
              <NavDropdown.Item href='#action3' className='custom-dropdown-item text-center'>
                Opción 3
              </NavDropdown.Item>
            </NavDropdown> */}
            <Button variant='white' className='order-2 ml-auto mx-lg-5 d-none d-lg-flex d-flex justify-content-center align-items-center cart-button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample'>
              <p>Carrito</p> <BsCart className='ms-2' />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <hr className='pt-5' />
      <div className='offcanvas offcanvas-start' tabIndex='-1' id='offcanvasExample' aria-labelledby='offcanvasExampleLabel'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasExampleLabel'>
            Offcanvas
          </h5>
          <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
        </div>
        <div className='offcanvas-body'>
          <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
