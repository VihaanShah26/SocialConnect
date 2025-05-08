import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const UserCard = ({ firstName, lastName, email, phone, interests }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{firstName} {lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
        <Card.Text>
          <strong>Phone:</strong> {phone}
        </Card.Text>
        <div>
          <strong>Interests:</strong>{' '}
          {interests && interests.length > 0 ? (
            interests.map((interest, idx) => (
              <Badge bg="info" key={idx} className="me-1">
                {interest.label}
              </Badge>
            ))
          ) : (
            <span>No interests listed</span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;