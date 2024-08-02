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
import { auth, db, googleProvider } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'company'>('student');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
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
    setLoading(true); // Set loading to true when sign up starts
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        const displayName =
          role === 'company' ? companyName : `${firstName} ${lastName}`;
        await updateProfile(userCredential.user, { displayName });
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          firstName,
          lastName,
          companyName,
          role,
        });
      }
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when sign up ends
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true); // Set loading to true when sign up starts
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const displayName = role === 'company' ? companyName : user.displayName;
      await setDoc(doc(db, 'users', user.uid), {
        firstName: role === 'company' ? null : user.displayName?.split(' ')[0],
        lastName: role === 'company' ? null : user.displayName?.split(' ')[1],
        companyName: role === 'company' ? companyName : null,
        role,
      });
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when sign up ends
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
      <div className="text-center mb-1">
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
              <Form.Group controlId="formRole" className="mb-3">
                <Form.Label>Sign Up As</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Student"
                    value="student"
                    checked={role === 'student'}
                    onChange={(e) =>
                      setRole(e.target.value as 'student' | 'company')
                    }
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Company"
                    value="company"
                    checked={role === 'company'}
                    onChange={(e) =>
                      setRole(e.target.value as 'student' | 'company')
                    }
                  />
                </div>
              </Form.Group>
              {role === 'company' ? (
                <Form.Group controlId="formCompanyName" className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </Form.Group>
              ) : (
                <>
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
                </>
              )}
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
              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-2"
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                ) : null}
                Sign Up
              </Button>
            </Form>
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2 text-muted">Or with</span>
              <hr className="flex-grow-1" />
            </div>
            <Button
              variant="outline-primary"
              className="w-100 mb-2"
              onClick={handleGoogleSignUp}
              disabled={loading} // Disable button while loading
            >
              <FcGoogle /> Sign Up with Google
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
