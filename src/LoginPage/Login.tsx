// src/components/Login.tsx
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import visibility icons
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after login completes
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); // Set loading to true when Google login starts
    try {
      googleProvider.setCustomParameters({
        prompt: 'select_account',
      });
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after Google login completes
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container
      fluid
      className="outer-container d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <div className="text-center">
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
              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-2"
                disabled={loading} // Disable button when loading
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Log In'
                )}
              </Button>
              <div className="d-flex justify-content-center mb-3">
                <Button
                  variant="link"
                  className="forgot-password p-0"
                  onClick={handlePasswordReset}
                >
                  Forgot Password?
                </Button>
              </div>
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
              disabled={loading} // Disable button when loading
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
