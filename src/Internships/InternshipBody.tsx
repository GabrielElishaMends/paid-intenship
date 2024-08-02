import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from '../styles.module.css';
import { CompanyInfo } from '../data/companyData';

interface CompanyBodyProps {
  company: CompanyInfo;
}

const InternshipBody: React.FC<CompanyBodyProps> = ({ company }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleApplyClick = (id: string) => {
    if (currentUser) {
      history.push('/apply', { companyId: id });
    } else {
      history.push('/login');
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Container key={company.id} className={`${styles.cardMargin} bg-secondary mb-4`}>
      <Row className="justify-content-center">
        <Row className="mb-1">
          <Col className={`${styles.compName} border-bottom`}>
            {company.companyName}
          </Col>
        </Row>
      </Row>
      <Row className="justify-content-center fs-4">
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Location:</span> {company.location}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Email:</span> {company.email}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Phone:</span> {company.phone}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Description:</span> 
            {showFullDescription ? (
              <>
                {company.description} 
                <Button variant="link" onClick={toggleDescription} style={{ color: 'white' }}>See less</Button>
              </>
            ) : (
              <>
                {company.description.length > 100 
                  ? `${company.description.substring(0, 100)}...` 
                  : company.description
                } 
                {company.description.length > 100 && (
                  <Button variant="link" onClick={toggleDescription} style={{ color: 'white' }}>See more</Button>
                )}
              </>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Salary:</span> {company.salary}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Internship Type:</span> {company.internshipType}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Duration:</span> {company.duration}
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Application Deadline:</span> {company.applicationDeadline}
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2">
            <Button variant="dark" className={`${styles.apply} mb-1`} onClick={() => handleApplyClick(company.id)}>
              Apply
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default InternshipBody;
