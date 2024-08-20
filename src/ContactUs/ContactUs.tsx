import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs: React.FC = () => {
  return (
    <div className="contact-us-background">
      <Container fluid className="contact-us-container d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 text-center">
          <Col xs={12}>
            <h2 className="mb-4 mt-5">Contact Us</h2>
          </Col>
          <Col xs={12} className="contact-details">
            <h4>Author: Gabriel Elisha Mends</h4>
            <p>Phone: +233-000-111-222</p>
            <p>Email: paidinternship3@gmail.com</p>
            <p>
              Location: Kwame Nkrumah University of Science and Technology,
              Kumasi, Ghana
            </p>
            <div className="social-icons mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2"
              >
                <FaInstagram />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
