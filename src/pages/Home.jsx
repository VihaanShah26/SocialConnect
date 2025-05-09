import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaSearch, FaHeart } from 'react-icons/fa';

const Home = () => {
  return (
    <div style={{ background: 'linear-gradient(to right, #667eea, #764ba2)', minHeight: '100vh', color: 'white' }}>
      <Container className="text-center py-5">
        <h1 className="display-4 fw-bold mb-3">Welcome to SocialConnect</h1>
        <p className="lead mb-4">
          Discover new friends and build real connections at Northwestern. Join the community today!
        </p>
        <Button variant="light" size="lg" as={Link} to="/find" className="mb-5">
          Get Started
        </Button>

        <Row className="mt-5">
          <Col md={4}>
            <Card className="bg-white text-dark border-0 shadow-lg">
              <Card.Body>
                <FaUsers size={48} className="mb-3" />
                <Card.Title>Explore Profiles</Card.Title>
                <Card.Text>See who’s out there! Learn more about other Wildcats on campus.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-white text-dark border-0 shadow-lg">
              <Card.Body>
                <FaSearch size={48} className="mb-3" />
                <Card.Title>Smart Search</Card.Title>
                <Card.Text>Filter and find people who share your interests and background.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-white text-dark border-0 shadow-lg">
              <Card.Body>
                <FaHeart size={48} className="mb-3" />
                <Card.Title>Make Connections</Card.Title>
                <Card.Text>Like profiles, save favorites, and reach out to new friends.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;