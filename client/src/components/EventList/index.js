import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';


const EventList = ({ events }) => {
  if (!events.length) {
    return <Card.Body><Card.Text><h3>You have not created any events yet</h3></Card.Text></Card.Body>;
  }

  return (
    <Container className='d-flex flex-column p-0 m-0' fluid>
      <Row className='w-100 h-100 p-0 m-0'>
        <Col className='w-100 p-0 m-0'>
          {events &&
            events.map(event => (
              <Link to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>
                <Card.Body className='d-flex flex-row justify-content-start align-items-center my-2 w-100' key={event._id}>
                  <Card.Text ><h3 >{event.name}</h3> {event.date} • {event.time} • {event.address} • {event.city} • {event.state} </Card.Text>
                </Card.Body>
              </Link>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default EventList;