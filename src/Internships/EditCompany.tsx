import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import './AddCompany.css';
import LoginFirst from './LoginFirst';

const EditCompany: React.FC = () => {
  const { state } = useLocation<{ companyId: string }>();
  const companyId = state?.companyId || '';
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [internshipType, setInternshipType] = useState('');
  const [duration, setDuration] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [error, setError] = useState('');
  const { currentUser, userRole } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (companyId) {
        const docRef = doc(db, 'companies', companyId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const companyData = docSnap.data();
          setCompanyName(companyData.companyName);
          setLocation(companyData.location);
          setEmail(companyData.email);
          setPhone(companyData.phone);
          setDescription(companyData.description);
          setSalary(companyData.salary);
          setInternshipType(companyData.internshipType);
          setDuration(companyData.duration);
          setApplicationDeadline(companyData.applicationDeadline);
        } else {
          setError('Company not found');
        }
      }
    };

    fetchCompanyData();
  }, [companyId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to edit a company.');
      return;
    }

    try {
      const docRef = doc(db, 'companies', companyId);
      await updateDoc(docRef, {
        companyName,
        location,
        email,
        phone,
        description,
        salary,
        internshipType,
        duration,
        applicationDeadline,
      });
      history.push('/internships');
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (!currentUser) {
    return <LoginFirst message="You must be logged in to edit a company." />;
  }

  if (userRole !== 'company') {
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
              <h2 className="text-center mb-2 add-company-heading">
                Access Denied
              </h2>
              <hr className="my-2 mb-4" />
              <p className="text-center">
                Only users with a company role can edit a company.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

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
            <h2 className="text-center mb-2 add-company-heading">EDIT INTERNSHIP FORM</h2>
            <hr className="my-2 mb-4" />
            {error && <Alert variant="danger">{error}</Alert>}
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
                <Form.Label>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter the description of the job the intern will be doing"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="salary" className="mb-3">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="internshipType" className="mb-3">
                <Form.Label>Internship Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter internship type"
                  value={internshipType}
                  onChange={(e) => setInternshipType(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="duration" className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter internship duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="applicationDeadline" className="mb-3">
                <Form.Label>Application Deadline</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter application deadline"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Update
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCompany;
