import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Button, Form, Col, Container, Jumbotron } from 'react-bootstrap';
import { QUERY_USER_EVENTS, QUERY_ME } from '../utils/queries';
import { ADD_EVENT } from '../utils/mutations';

const CreateEvent = () => {
  const defaultState = {
    name: '',
    date: '',
    time: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    description: ''
  };

  const [input, setInput] = useState(defaultState);
  const history = useHistory();

  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        const { userEvents } = cache.readQuery({ query: QUERY_USER_EVENTS });
        cache.writeQuery({
          query: QUERY_USER_EVENTS,
          data: { events: [addEvent, ...userEvents] }
        });
      } catch (e) {
        console.error(e);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, events: [...me.events, addEvent] } }
      });
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      // add event to database
      const newEvent = await addEvent({
        variables: { input: input }
      });

      // clear form value
      setInput(defaultState);
      history.push(`/event/${newEvent.data.addEvent._id}`);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <Jumbotron fluid className='m-5'>
      <Container id="create">
        <h1 >Create Event</h1>
        <p>
          Fill in the information below to let everyone know you are hosting a clean up!
        </p>
        <Form onSubmit={handleFormSubmit}>
          {/* Event Name */}
          <Form.Group as={Col} >
            <Form.Label>Event Name</Form.Label>
            <Form.Control name="name" onChange={handleChange} type="text" placeholder="Event Name" value={input.name} />
          </Form.Group>

          {/* Date Picker */}
          <Form.Group className='my-3'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="date"
              name="date"
              id="date"
              value={input.date}
            />
          </Form.Group>

          {/* time */}
          <Form.Group className='my-3'>
            <Form.Label>Time</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="time"
              name="time"
              id="time"
              value={input.time}
            />
          </Form.Group>

          {/* Address */}
          <Form.Group as={Col} className='my-3'>
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" onChange={handleChange} placeholder="Address" value={input.address} />
          </Form.Group>

          {/* Event Description */}
          <Form.Group className='my-3'>
            <Form.Label>Event Description</Form.Label>
            <Form.Control name="description" onChange={handleChange} placeholder="Tell us about your event" as="textarea" rows={8} value={input.description} />
          </Form.Group>

          <Button variant='secondary' type='submit' className='create-btn my-3'>
            Create Event
          </Button>
        </Form>
      </Container>
      {error && <div>Something went wrong...</div>}
    </Jumbotron>
  );
}

export default CreateEvent;