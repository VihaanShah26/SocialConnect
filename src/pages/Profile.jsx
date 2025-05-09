import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import interestOptions from '../data/interestOptions.json';
import { supabase } from '../utilities/Supabase';


const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interests: {"interests": []},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      interests: {"interests": selectedOptions} || {"interests": []},
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user already exists based on email
    const { data: existingUser, error: selectError } = await supabase
      .from('userInfo')
      .select('*')
      .eq('email', formData.email)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      console.error('Error checking user:', selectError);
      return;
    }

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('userInfo')
        .update(formData)
        .eq('email', formData.email);

      if (error) {
        console.error('Error updating user:', error);
      } else {
        console.log('User updated:', data);
      }
    } else {
      // Insert new user
      const { data, error } = await supabase
        .from('userInfo')
        .insert([formData])
        .select();

      if (error) {
        console.error('Error inserting user:', error);
      } else {
        console.log('User inserted:', data);
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Edit Your Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Interests</Form.Label>
          <Select
            isMulti
            options={interestOptions}
            value={formData.interests['interests']}
            onChange={handleInterestsChange}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select your interests..."
          />
        </Form.Group>

        <Button variant="primary" type="submit">Save Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;