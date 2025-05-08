import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import UserCard from '../components/UserCard';

const interestOptions = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'coding', label: 'Coding' },
  { value: 'travel', label: 'Travel' },
  { value: 'reading', label: 'Reading' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'cooking', label: 'Cooking' },
  { value: 'photography', label: 'Photography' },
];

const FindOthers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);

  const mockUsers = [
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@northwestern.edu',
      phone: '123-456-7890',
      interests: [
        { label: 'Music' },
        { label: 'Reading' },
        { label: 'Photography' }
      ]
    },
    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@northwestern.edu',
      phone: '987-654-3210',
      interests: [
        { label: 'Gaming' },
        { label: 'Coding' }
      ]
    },
    {
      firstName: 'Alice',
      lastName: 'Nguyen',
      email: 'alice@u.northwestern.edu',
      phone: '312-222-3344',
      interests: [
        { label: 'Travel' },
        { label: 'Cooking' },
        { label: 'Music' }
      ]
    },
    {
      firstName: 'Carlos',
      lastName: 'Ramirez',
      email: 'carlos@u.northwestern.edu',
      phone: '847-555-0192',
      interests: [
        { label: 'Sports' },
        { label: 'Gaming' },
        { label: 'Coding' }
      ]
    },
    {
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya@u.northwestern.edu',
      phone: '224-999-1212',
      interests: [
        { label: 'Reading' },
        { label: 'Photography' },
        { label: 'Travel' }
      ]
    }
  ];

  const filteredUsers = () => {
    return mockUsers.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const searchMatch = fullName.includes(searchTerm.toLowerCase());

      const selectedLabels = selectedInterests.map(i => i.label);
      const interestMatch =
        selectedLabels.length === 0 ||
        user.interests.some(i => selectedLabels.includes(i.label));

      return searchMatch && interestMatch;
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Find Others</h2>
      <Form className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by first or last name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Select
            isMulti
            options={interestOptions}
            value={selectedInterests}
            onChange={setSelectedInterests}
            placeholder="Filter by interests"
          />
        </Form.Group>
      </Form>
      <Row>
        {filteredUsers().map((user, idx) => (
          <Col md={6} lg={4} key={idx}>
            <UserCard {...user} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FindOthers;