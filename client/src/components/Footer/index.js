import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
    return(
        <Navbar variant='dark' expand="lg" className='d-flex flex-column justify-content-between p-3'>
            <Navbar.Brand href="/" className='mb-2'>Orlando Event-tures</Navbar.Brand>
            <Nav className='d-flex flex-row justify-content-center mb-2'>
               
            </Nav>
        </Navbar>
    );
};

export default Footer;