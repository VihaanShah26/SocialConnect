import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email) {
        const { data, error } = await supabase
          .from('userInfo')
          .select('*')
          .eq('email', user.email)
          .single();

        if (data) {
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            phone: data.phone || '',
            interests: { interests: data.interests?.interests || [] },
          });
        } else if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

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
        return; 
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
        return;
      } else {
        console.log('User inserted:', data);
      }
    }

    alert("Profile saved successfully!");
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingTop: '40px' }}>
      <Container>
        <div className="bg-white p-5 rounded shadow-sm">
          <h2 className="mb-4 text-center fw-bold">Edit Your Profile</h2>
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

            <div className="text-center">
              <Button variant="primary" type="submit">Save Profile</Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Profile;