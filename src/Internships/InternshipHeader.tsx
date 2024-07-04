// src/components/InternshipHeader.tsx

import React from 'react';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';

const InternshipHeader = () => {
  const { currentUser } = useAuth();

  // Extract the first letter of the user's display name or email
  const firstLetter = currentUser
    ? (currentUser.displayName || currentUser.email)?.[0]?.toUpperCase()
    : '';

  return (
    <Container
      fluid
      className={`${styles.customHeight} d-flex align-items-center bg-dark`}
    >
      <Row noGutters className="d-flex align-items-center text-white w-100">
        <Col className={`${styles.logo} fs-2 fw-bold`}>
          <NavLink to="/" className={styles.logoLink} exact>
            PAID-INTERNSHIP
          </NavLink>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className={`${styles.navLinks}`}>
            <NavLink
              to="/home"
              className={`${styles.link} fs-5`}
              activeClassName={styles.activeLink}
            >
              Home
            </NavLink>
            <NavLink
              to="/internships"
              className={`${styles.link} fs-5`}
              activeClassName={styles.activeLink}
            >
              Internship
            </NavLink>
            <NavLink
              to="/contactus"
              className={`${styles.link} fs-5`}
              activeClassName={styles.activeLink}
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/about"
              className={`${styles.link} fs-5`}
              activeClassName={styles.activeLink}
            >
              About
            </NavLink>
          </div>
        </Col>
        <Col
          xs="auto"
          className="d-flex align-items-center justify-content-end"
        >
          {currentUser && (
            <div className={styles.userCircle}>{firstLetter}</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default InternshipHeader;
