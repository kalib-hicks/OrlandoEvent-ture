import React from 'react';
import Auth from '../../utils/auth';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return(
        <Navbar variant='dark' expand="lg" className='d-flex justify-content-left px-3'>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-left">
                <Nav>
                    <Nav.Link href="/">Search</Nav.Link>
                    {Auth.loggedIn() ? (
                        <>
                            <Nav.Link href="/profile">Your Events</Nav.Link>
                            <Nav.Link href="/create-event">Create Event</Nav.Link>
                            <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/signup">Signup</Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;