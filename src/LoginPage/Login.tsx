import React from 'react';
import styles from '../styles.module.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <Container
      fluid
      className="outer-container d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100">
        <Col xs={9} md={8} lg={5} className="mx-auto">
          <div className="login-form p-4 rounded shadow">
            <h2 className="text-center mb-4">Log In</h2>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                <Link to="/home" className={styles.link}>
                  Log In
                </Link>
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
