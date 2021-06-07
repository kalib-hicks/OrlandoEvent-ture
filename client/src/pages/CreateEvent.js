import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { Button, Form, Col, Container, Jumbotron } from 'react-bootstrap';
import { QUERY_USER_EVENTS, QUERY_ME } from '../utils/queries';
import { ADD_EVENT } from '../utils/mutations';
import Auth from '../utils/auth';

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

  if (!Auth.loggedIn()) {
    return (
      <h3 style={{ color: 'black', textAlign: 'center' }}>
          You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h3>
    );
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

          {/* City */}
          <Form.Group as={Col} className='my-3'>
            <Form.Label>City</Form.Label>
            <Form.Control name="city" onChange={handleChange} placeholder="City" value={input.city} />
          </Form.Group>

          {/* State*/}
          <Form.Group as={Col} className='my-3'>
            <Form.Label>State</Form.Label>
            <Form.Control name="state" onChange={handleChange} as="select" defaultValue="State">
              <option>State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </Form.Control>
          </Form.Group>

          {/* Zip */}
          <Form.Group as={Col} className='my-3'>
            <Form.Label>Zip</Form.Label>
            <Form.Control name="zip" onChange={handleChange} placeholder="Zip" maxLength="5" value={input.zip} />
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