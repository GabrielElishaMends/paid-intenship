import React from 'react';
import styles from '../styles.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HomeBody = ({ name }) => {
  return (
    <Container className={`${styles.cardMargin} bg-secondary`}>
      <Row className=" justify-content-center">
        <Row className="mb-1">
          <Col className={`${styles.compName} border-bottom`}>{name}</Col>
        </Row>
      </Row>
      <Row className=" justify-content-center fs-4">
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Role:</span> Internship Role
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Duration:</span> 3 months
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Qualifications:</span> Lorem ipsum dolor
            sit amet
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <span className="fw-bold">Salary:</span> $1000 per month
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="dark" className={`${styles.apply} mb-1`}>
              Apply
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default HomeBody;
