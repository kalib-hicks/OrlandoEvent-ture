import React, { useState } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Container, Jumbotron, Col, Accordion, Card, Row, Image } from 'react-bootstrap';
import { CaretDownFill } from 'react-bootstrap-icons';
import EventList from '../components/EventList';
import FriendList from '../components/FriendList';

const Profile = () => {
    const { username: userParam } = useParams();
    const [addFriend] = useMutation(ADD_FRIEND);
    const [activeId, setActiveId] = useState('0');


    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    // redirect to personal profile page if username is the logged-in user's
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h3 style={{ color: 'black', textAlign: 'center' }}>
                You need to be logged in to see this page. Use the navigation links above to sign up or log in!
            </h3>
        );
    }

    const handleClick = async () => {
        try {
            await addFriend({
                variables: { id: user._id }
            });
        } catch (e) {
            console.error(e);
        }
    };

    const toggleActive = (id) => {
        if (activeId === id) {
            setActiveId(null);
        } else {
            setActiveId(id);
        }
    }

    return (
        <Jumbotron fluid className='my-5'>
            <Container id="profile">
                <div>
                    <Row className='w-100'>
                        <Col md={6}>
                            <Image src={user.image} className='user-image' rounded />
                        </Col>    
                        <Col md={6}>
                            <h1 >{user.username}</h1>
                            {userParam && (
                                <Button variant='secondary' className='friend-btn' onClick={handleClick}>
                                    Add Friend
                                </Button>
                            )}
                        </Col>    
                    </Row>

                    {/* Created Events*/}
                    <Accordion style={{ margin: 'auto' }} defaultActiveKey="0">
                        <h2 style={{ margin: '10px auto', display: 'inline' }}>Created Events</h2>
                        <Accordion.Toggle onClick={() => toggleActive('0')} variant="link" eventKey="0" className='toggle'>
                            <CaretDownFill />
                        </Accordion.Toggle>
                        <Card style={{ padding: 0, margin: 'auto', width: '100%' }} className={activeId === '0' ? 'panel-wrap active-panel' : 'panel-wrap'}>
                            <Accordion.Collapse style={{ padding: 0, margin: 0 }} eventKey="0">
                                <EventList events={user.events} />
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>

                    {/* Friends */}
                    <Accordion style={{ margin: 'auto' }} defaultActiveKey="0">
                        <h2 style={{ margin: '20px auto', display: 'inline' }}>Friends</h2>
                        <Accordion.Toggle onClick={() => toggleActive('0')} variant="link" eventKey="0" className='toggle'>
                            <CaretDownFill />
                        </Accordion.Toggle>
                        <Card style={{ padding: 0, margin: '20px auto' }} className={activeId === '1' ? 'panel-wrap active-panel' : 'panel-wrap'}>
                            <Accordion.Collapse style={{ padding: 0, margin: 0 }} eventKey="0">
                                <FriendList
                                    username={user.username}
                                    friendCount={user.friendCount}
                                    friends={user.friends}
                                />
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </Container>
        </Jumbotron >

    );
};

export default Profile;