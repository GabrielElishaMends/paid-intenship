// src/components/Login.tsx

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { FcGoogle } from 'react-icons/fc'; // Import the Google icon
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the visibility icons
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container
      fluid
      className="outer-container d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <div className="text-center mb-4">
        <Link to="/" className="text-decoration-none">
          <h1 className="text-primary">PAID-INTERNSHIP</h1>
        </Link>
      </div>
      <Row className="w-100">
        <Col xs={9} md={8} lg={5} className="mx-auto">
          <div className="login-form p-4 rounded shadow">
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-2">
                Log In
              </Button>
            </Form>
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">Or with</span>
              <hr className="flex-grow-1" />
            </div>
            <Button
              variant="outline-danger"
              onClick={handleGoogleLogin}
              className="w-100 d-flex align-items-center justify-content-center"
            >
              <FcGoogle className="me-2" />
              Log In with Google
            </Button>
            <div className="text-center mt-3">
              <Form.Text>
                Don't have an account?{' '}
                <Link to="/signup" className="signupLink">
                  Sign Up
                </Link>
              </Form.Text>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
