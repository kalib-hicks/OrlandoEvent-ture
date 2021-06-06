import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Footer = () => {
    return(
        <Navbar variant='dark' expand="lg" className='d-flex flex-column justify-content-between p-3'>
            <Navbar.Brand href="/" className='mb-2'>Project Gaia</Navbar.Brand>
            <Nav className='d-flex flex-row justify-content-center mb-2'>
                <Nav.Link href="https://www.facebook.com" target='_blank' className='text-center'>
                    <img src={require(`../../assets/icons/social-facebook.svg`).default} alt="Facebook Link" className='social-icons' />
                </Nav.Link>
                <Nav.Link href="https://www.instagram.com" target='_blank' className='text-center'>
                    <img src={require(`../../assets/icons/social-instagram.svg`).default} alt="Instagram Link" className='social-icons' />
                </Nav.Link>
                <Nav.Link href="https://www.twitter.com" target='_blank' className='text-center'>
                    <img src={require(`../../assets/icons/social-twitter.svg`).default} alt="Twitter Link" className='social-icons' />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Footer;