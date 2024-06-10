import React from 'react';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomeHeader = () => {
  return (
    <Container
      fluid
      className={`${styles.customHeight} d-flex align-items-center bg-dark justify-content-center`}
    >
      <Row className="d-flex align-items-center text-white w-100">
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
              <Link to="/companies" className={styles.link}>
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
            <Col
              className={`${styles.hoverBold} d-flex align-items-center justify-content-center`}
            >
              <Link to="/about" className={styles.link}>
                About
              </Link>
            </Col>
            <Col
              className={`${styles.signUp} d-flex align-items-center justify-content-center`}
            >
              <Link to="/signup" className={styles.sign}>
                Sign Up
              </Link>
            </Col>
            <Col
              className={`${styles.signUp}  bg-secondary d-flex align-items-center justify-content-center`}
            >
              <Link to="/login" className={styles.sign}>
                Log in
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeHeader;
