// src/components/SignUp.tsx

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { auth, googleProvider } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc'; // Import the Google icon
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the visibility icons
import './SignUp.css';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const history = useHistory();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setPasswordError('Password does not meet the required criteria.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Optionally update the user's profile
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });
      }
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
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

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  return (
    <Container
      fluid
      className="outer-container d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <div className="text-center mb-1 ">
        <Link to="/" className="text-decoration-none">
          <h1 className="text-primary">PAID-INTERNSHIP</h1>
        </Link>
      </div>
      <Row className="w-100">
        <Col xs={9} md={8} lg={5} className="mx-auto">
          <div className="sign-up-form p-4 rounded shadow">
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignUp}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
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
              <Form.Group controlId="formPassword" className="mb-2">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                {passwordError && (
                  <Alert variant="danger" className="mt-2">
                    {passwordError}
                  </Alert>
                )}
                <Form.Text className="text-muted">
                  Password must be at least 8 characters long and include an
                  uppercase letter, a lowercase letter, a number, and a special
                  character.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
              <div className="text-center mb-3">
                <Form.Text>
                  Already have an account?{' '}
                  <Link to="/login" className="loginLink">
                    Log in
                  </Link>
                </Form.Text>
              </div>
              <Button variant="primary" type="submit" className="w-100 mb-2">
                Sign Up
              </Button>
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1" />
                <span className="mx-2 text-muted">Or with</span>
                <hr className="flex-grow-1" />
              </div>
              <Button
                variant="outline-danger"
                onClick={handleGoogleSignUp}
                className="w-100 d-flex align-items-center justify-content-center"
              >
                <FcGoogle className="me-2" />
                Sign Up with Google
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
