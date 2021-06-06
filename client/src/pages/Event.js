import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import { CalendarEvent, Clock, GeoAlt } from 'react-bootstrap-icons';
import { ADD_COMMENT, ADD_ATTENDEE } from '../utils/mutations';
import { QUERY_SINGLE_EVENT } from '../utils/queries';

import CommentList from '../components/CommentList';
import AttendanceList from '../components/AttendanceList';
import Auth from '../utils/auth';

function Event() {
    const { id: eventId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
        variables: { id: eventId }
    });

    let event = data?.singleEvent || [];

    const [commentText, setCommentText] = useState('');

    const [addComment] = useMutation(ADD_COMMENT, {
        update(cache, { data: { addComment } }) {
            try {
                const { event } = cache.readQuery({
                    query: QUERY_SINGLE_EVENT,
                    variables: { id: eventId }
                })
                cache.writeQuery({
                    query: QUERY_SINGLE_EVENT,
                    variables: { id: eventId },
                    data: { event: { ...event, comments: [...event.comments, addComment] } }
                })
            } catch(e){
                console.error(e)
            }
        }
    });

    const [addAttendee] = useMutation(ADD_ATTENDEE, {
        update(cache, { data: { addAttendee } }) {
            try {
                const { event } = cache.readQuery({
                    query: QUERY_SINGLE_EVENT,
                    variables: { id: eventId }
                })
                cache.writeQuery({
                    query: QUERY_SINGLE_EVENT,
                    variables: { id: eventId },
                    data: { event: { ...event, attendees: [...event.attendees, addAttendee] } }
                })
            } catch(e){
                console.error(e)
            }
        }
    });

    if (loading) {
        return <div>Loading...</div>
    }

    const handleChange = event => {
        if (event.target.value.length > 0){
            setCommentText(event.target.value)
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addComment({
                variables: {eventId, commentText}
            });

            setCommentText('');
        } catch (e) {
            console.error(e)
        }
    }

    const handleRSVP = async event => {
        event.preventDefault();

        try {
            await addAttendee({
                variables: { eventId }
            })
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <Container id='event' className='my-5'>
            <Row className='event-details'>
                <Col xs={12} md={6}>
                    <Image src={event.image} className='event-img' fluid />
                </Col>
                <Col xs={12} md={6}>
                    <h2 className='mt-3'>{event.name}</h2>
                    <Container className='event-info p-0'>
                        <div>
                            <CalendarEvent className='event-icons' style={{marginLeft: '0px'}} /> {event.date} 
                        </div>
                        <div>
                            <Clock className='event-icons' /> {event.time} 
                        </div>
                        <div>
                            <GeoAlt className='event-icons geo-icon' /> {event.address}, {event.city}, {event.state}
                        </div>
                    </Container>
                    <p>{event.description}</p>
                    <Button variant="success" onClick={handleRSVP}>RSVP</Button>
                    <h5 className='mt-4'>People Attending: {event.attendanceCount}</h5>
                    {event.attendanceCount > 0 && <AttendanceList attendees={event.attendees} />}
                </Col>
            </Row>

            <Row className='event-comments'>
                <Col>
                    {Auth.loggedIn() && 
                    <Form onSubmit={handleFormSubmit} className='mt-3'>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label></Form.Label>
                            <Form.Control onChange={handleChange} value={commentText} as="textarea" rows={3} placeholder='Leave Comment Here'/>
                            <br/>
                            <Button variant='primary' type='submit'>Post Comment</Button>
                        </Form.Group>
                    </Form>
                    }
                    <h3 className='mt-5'>Comments</h3>
                    <CommentList comments={event.comments} commentCount={event.commentCount} />
                </Col>
            </Row>
        </Container>
    )
}

export default Event;
