import React from 'react';
import { Container } from 'react-bootstrap';

const About = () => {
    return(
        <Container id='about' className='d-flex flex-column justify-content-center mb-5' fluid>
            <h2>About Project Gaia</h2>
            <p>
                In 2009, the Keep America Beautiful organization found that there is 51.2 BILLION pieces of trash littering our roadways.
                Project Gaia is our attempt to do our part to keep our home planet clean. We aim to bring communities together to cleanup our neighborhoods and leave the world a better place for future generations.
            </p>
        </Container>
    );
};

export default About;