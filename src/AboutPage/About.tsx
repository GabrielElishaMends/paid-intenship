// src/components/About.tsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { teamMembers } from '../data/teamMembers';
import './About.css';

const About: React.FC = () => {
  return (
    <Container fluid className="aboutbg">
      <h1 className="text-center mb-4">About Us</h1>

      <Row className="mb-4 text-center">
        <Col>
          <p>
            Welcome to PAID-INTERNSHIP, a platform dedicated to connecting
            students with valuable internship opportunities. Our mission is to
            provide students with access to paid internships that will help them
            gain practical experience in their field of study.
          </p>
        </Col>
      </Row>

      <Row className="mb-4 text-center">
        <Col>
          <h2>Our Mission</h2>
          <p>
            Our mission is to bridge the gap between academic learning and
            professional experience by providing students with opportunities to
            work in real-world environments. We believe that internships are a
            critical part of education, helping students to apply their
            knowledge, develop new skills, and make professional connections.
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Our Team</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        {teamMembers.map((member, index) => (
          <Col key={index} md={4} xs={8} className="mb-4">
            <Card className="cardShadow">
              <Card.Img variant="top" src={member.image} />
              <Card.Body>
                <Card.Title>Team Member {index + 1}: {member.name}</Card.Title>
                <Card.Text>{member.position}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default About;
