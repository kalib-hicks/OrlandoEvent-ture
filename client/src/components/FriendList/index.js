import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';


const FriendList = ({ friendCount, username, friends }) => {
  if (!friends || !friends.length) {
    return <Card.Body><Card.Text><h3>{username}, make some friends!</h3></Card.Text></Card.Body>;
  }

  return (
    <Container className='d-flex flex-column p-0 m-0' fluid>
      <Row className='w-100 h-100 p-0 m-0'>
        <Col className='w-100 p-0 m-0'>
          {friends.map(friend => (
            <Link to={`/profile/${friend.username}`}>
              <Card.Body className='d-flex flex-row justify-content-start align-items-center my-2' key={friend._id}>
                <Card.Text>
                  {/* {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'} */}
                  {friend.username}
                </Card.Text>
              </Card.Body>
            </Link>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default FriendList;