import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, FormControl, InputGroup, Jumbotron } from 'react-bootstrap';

const Search = () => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState('');

    const handleChange = event => {
        setSearchValue('32822');
    }

    const handleSearchSubmit = async event => {
        event.preventDefault();
        
        history.push(`/results/${searchValue}`);
    }

    return(
        <Jumbotron className='mb-5'>
            <Container id='search' className='d-flex flex-column justify-content-center align-items-center' fluid>
                <div>
                    <h2>Find Event-tures in Orlando!</h2>
                    
                    <Form onClick={handleSearchSubmit}>
                        <InputGroup className='d-flex justify-content-center'>
                            <FormControl
                                type='text'
                                placeholder='Get started'
                                aria-label=''
                                value={searchValue}
                                onClick={handleChange}
                            />
                            <InputGroup.Append>
                                <Button variant='secondary' className='search-btn' type='submit' style={{color: 'light-grey', textDecoration:'none'}}>
                                    
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