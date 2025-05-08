import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Welcome to SocialConnect</h1>
          <p className="mt-3">
            Find your people. Build your community. Make friends at Northwestern with ease.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;