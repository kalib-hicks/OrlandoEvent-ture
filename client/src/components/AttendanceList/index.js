import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDeck, Container } from 'react-bootstrap';

const AttendanceList = ({attendees}) => {
    return(
        <Container id='attendance-list'>
            <CardDeck>
                {attendees && 
                attendees.map((attendee, index) => (
                    <Card key={attendee._id} style={{backgroundColor: 'transparent', border: 'none'}}>
                        <Link to={`/profile/${attendee.username}`} style={{textDecoration: 'none'}}>
                            <Card.Title style={{fontSize: '0.85rem', marginRight: '3px'}}>
                                {attendee.username}{index < attendees.length-1 ? ', ' : ' '}
                            </Card.Title>
                        </Link>
                    </Card>
                ))}
            </CardDeck>
        </Container>
    );
};

export default AttendanceList;
