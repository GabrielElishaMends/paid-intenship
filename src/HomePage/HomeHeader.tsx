// src/components/HomeHeader.tsx

import React from 'react';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const HomeHeader = () => {
  return (
    <Container
      fluid
      className={`${styles.customHeight} d-flex align-items-center bg-dark`}
    >
      <Row className="d-flex align-items-center text-white w-100">
        <Col className={`${styles.logo} fs-2 fw-bold`}>
          <NavLink to="/" className={styles.logoLink} exact>
            PAID-INTERNSHIP
          </NavLink>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className={`${styles.navLinks}`}>
            <NavLink
              to="/home"
              className={`${styles.link} fs-5 fw-bold`}
              activeClassName={styles.activeLink}
            >
              Home
            </NavLink>
            <NavLink
              to="/internships"
              className={`${styles.link} fs-5`}
              activeClassName={styles.activeLink}
            >
              Internships
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
            <NavLink
              to="/login"
              className={`${styles.link} fs-5 ${styles.logInLink}`}
              activeClassName={styles.activeLink}
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className={`${styles.link} fs-5 ${styles.signUpLink}`}
              activeClassName={styles.activeLink}
            >
              Sign Up
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeHeader;
