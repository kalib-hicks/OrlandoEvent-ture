import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, FormControl, InputGroup, Jumbotron } from 'react-bootstrap';

const Search = () => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState('');

    //const handleChange = event => {
        
    //}

    const handleSearchSubmit = async event => {
        setSearchValue('32822');
        event.preventDefault();
        
        history.push(`/results/${searchValue}`);
    }

    return(
        <Jumbotron className='mb-5'>
            <Container id='search' className='d-flex flex-column justify-content-center align-items-center' fluid>
                <div>
                    <h2>Find Event-tures in Orlando!</h2>
                    
                    <Form onSubmit={handleSearchSubmit}>
                        <InputGroup className='d-flex justify-content-center'>
                            <FormControl
                                type='text'
                                placeholder='Enter city to find events near you'
                                aria-label='Search by Zipcode'
                                value={searchValue}
                                onChange={handleChange}
                            />
                            <InputGroup.Append>
                                <Button variant='secondary' className='search-btn' type='submit' style={{color: 'white', textDecoration:'none'}}>
                                    Get Started
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
            </Container>
        </Jumbotron>
    );
};

export default Search;