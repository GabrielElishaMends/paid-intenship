import React from 'react';
import styles from '../styles.module.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  return (
    <Container fluid className="outer-container d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col xs={9} md={8} lg={5} className="mx-auto">
          <div className="sign-up-form p-4 rounded shadow">
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" />
              </Form.Group>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
              <div className="text-center mb-4">
                <Form.Text >
                  Already have an account? <Link to="/login" className="loginLink">Log in</Link>
                </Form.Text>
              </div>
              <Button variant="primary" type="submit" className="w-100">
              <Link to="/home" className={styles.link}>
                Sign Up
              </Link>
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
