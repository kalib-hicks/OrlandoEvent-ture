import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';

const CommentList = ( {comments, commentCount} ) => {
    return (
        <CardDeck>
            {commentCount ? (
                comments.map(comment => (
                    <Card className='my-2' style={{borderRadius: '10px'}} key={comment._id}>
                        <Card.Body>
                            <Card.Text style={{fontSize: '1.2rem'}}>
                                {comment.commentText}
                            </Card.Text>
                            <Card.Text className='comment-info'>
                                Posted by {comment.username} at {comment.createdAt}
                            </Card.Text>
                        </Card.Body>
                    </Card>
               )
            )) : (
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Be the first to leave a comment!
                        </Card.Title>
                    </Card.Body>
                </Card>
            )}
       </CardDeck>
    );
};

export default CommentList;
