import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import UserCard from '../components/UserCard';
import { supabase } from '../utilities/Supabase';

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
  const [selectedInterests, setSelectedInterests] = useState({ interests: [] });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('userInfo').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = () => {
    return users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const searchMatch = fullName.includes(searchTerm.toLowerCase());

      const selectedLabels = selectedInterests.interests.map(i => i.label);
      const interestMatch =
        selectedLabels.length === 0 ||
        (user.interests?.interests || []).some(i => selectedLabels.includes(i.label));

      return searchMatch && interestMatch;
    });
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingTop: '40px' }}>
      <Container>
        <h2 className="text-center mb-5 fw-bold">Find Others</h2>
        <div className="bg-white p-4 rounded shadow-sm mb-4">
          <Form>
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
                value={selectedInterests.interests}
                onChange={(selected) => setSelectedInterests({ interests: selected || [] })}
                placeholder="Filter by interests"
              />
            </Form.Group>
          </Form>
        </div>
        <Row>
          {filteredUsers().map((user, idx) => (
            <Col md={6} lg={4} className="mb-4" key={idx}>
              <UserCard {...user} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default FindOthers;