import React from 'react';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AboutHeader = () => {
  return (
    <Container
      fluid
      className={`${styles.customHeight} d-flex align-items-center bg-dark`}
    >
      <Row noGutters className="d-flex align-items-center text-white w-100">
        <Col className={`${styles.logo} fs-2 fw-bold`}>
          <Link to="/" className={styles.link}>
            PAID-INTERNSHIP
          </Link>
        </Col>
        <Col>
          <Row className="justify-content-end fw-light">
            <Col
              className={`${styles.hoverBold} d-flex align-items-center justify-content-center`}
            >
              <Link to="/home" className={styles.link}>
                Home
              </Link>
            </Col>
            <Col
              className={`${styles.hoverBold} d-flex align-items-center justify-content-center`}
            >
              <Link to="/internships" className={styles.link}>
                Companies
              </Link>
            </Col>
            <Col
              className={`${styles.hoverBold} d-flex align-items-center justify-content-center`}
            >
              <Link to="/contactus" className={styles.link}>
                Contact Us
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutHeader;
