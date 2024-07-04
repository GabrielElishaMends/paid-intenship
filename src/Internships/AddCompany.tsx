import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import './AddCompany.css';

const AddCompany: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to add a company.');
      return;
    }
    try {
      await addDoc(collection(db, 'companies'), {
        companyName,
        location,
        email,
        phone,
        description,
      });
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container fluid className={styles.backColor}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <div className="text-center mb-4">
            <Link to="/" className="text-decoration-none">
              <h1 className="text-primary mt-2">PAID-INTERNSHIP</h1>
            </Link>
          </div>
          <div className="add-company-container">
            <h2 className="text-center mb-2">ADD COMPANY</h2>
            <hr className="my-2 mb-4" />
            {error && <p className="text-danger">{error}</p>}
            {currentUser ? (
              <Form onSubmit={handleSubmit} className="add-company-form">
                <Form.Group controlId="companyName" className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="location" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter company description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            ) : (
              <p className="text-center text-danger">
                You must be logged in to add a company.
              </p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCompany;
