// src/internships/CompanyBody.tsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from '../styles.module.css';
import { CompanyInfo } from '../data/companyData';

interface CompanyBodyProps {
  company: CompanyInfo;
}

const CompanyBody: React.FC<CompanyBodyProps> = ({ company }) => {
  const { id, companyName, location, email, phone, description } = company;
  const { currentUser } = useAuth();
  const history = useHistory();

  const handleApplyClick = () => {
    if (currentUser) {
      history.push('/apply', { companyId: id });
    } else {
      history.push('/login');
    }
  };

  return (
    <Container className={`${styles.cardMargin} bg-secondary mb-4`}>
      <Row className="justify-content-center">
        <Row className="mb-1">
          <Col className={`${styles.compName} border-bottom`}>
            {companyName}
          </Col>
        </Row>
      </Row>
      <Row className="justify-content-center fs-4">
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Location:</span> {location}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Email:</span> {email}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Phone:</span> {phone}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Description:</span> {description}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="dark"
              className={`${styles.apply} mb-1`}
              onClick={handleApplyClick}
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default CompanyBody;
