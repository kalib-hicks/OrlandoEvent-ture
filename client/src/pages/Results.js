import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardDeck, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { CalendarEvent, Clock, GeoAlt } from 'react-bootstrap-icons';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_SEARCH_EVENTS } from '../utils/queries';
import ResultsMap from '../components/ResultsMap';
import Auth from '../utils/auth';

const Results = () => {
  const { city: searchParam } = useParams();
  const { loading, data } = useQuery(QUERY_SEARCH_EVENTS, {
    variables: { city: searchParam }
  });

  const events = data?.searchEvents || {};

  if (loading) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <Spinner animation='border' variant='primary' className='my-3' />
        <h1 style={{ color: 'black', display: 'inline' }}>Loading...</h1>
      </div>
    );
  }

  if (!events.length) {
    return <CardDeck id="results" className='my-2 event-card w-100 h-100'><Card.Title>There aren't any events in this city yet</Card.Title></CardDeck>;
  }


  return (
    <Container id="results" className='my-2' fluid>
      <Row className='w-100 h-100'>
        <Col xs={12} lg={6} className='results-container'>
          <CardDeck>
            {events.map(event => (
              <Card className='my-2 event-card' key={event._id}>
                <Card.Img variant='top' src={event.image} className='event-img' />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  {Auth.loggedIn() ? (
                    <>
                      <Card.Subtitle>
                        <CalendarEvent style={{ marginLeft: '0px', marginRight: '5px', marginTop: '10px', marginBottom: '10px' }} /> {event.date}
                        <Clock style={{ marginLeft: '10px', marginRight: '5px', marginTop: '10px', marginBottom: '10px' }} /> {event.time}
                        <GeoAlt style={{ marginLeft: '10px', marginRight: '5px', marginTop: '10px', marginBottom: '10px' }} /> {event.address}
                      </Card.Subtitle>
                    </>
                  ) : (
                    <>
                      <Card.Subtitle>
                        <CalendarEvent style={{ marginLeft: '0px', marginRight: '5px', marginTop: '10px', marginBottom: '10px' }} /> {event.date}
                      </Card.Subtitle>
                    </>
                  )}
                  <Card.Text>{event.description}</Card.Text>
                  <Link to={`/event/${event._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    <Button variant='primary'>
                      View Event
                  </Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
        </Col>
        <Col xs={12} lg={6} className='results-map-container'>
          <ResultsMap mapData={events} />
        </Col>
      </Row>
    </Container>
  );
};

export default Results;