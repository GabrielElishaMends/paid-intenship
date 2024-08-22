import React, { useState, useEffect } from 'react';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row, Dropdown, Modal, Button } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { FaUser } from 'react-icons/fa'; // Import the user icon

const InternshipHeader = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const history = useHistory();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Extract the first letter of the user's display name or email
  const firstLetter = currentUser
    ? (currentUser.displayName || currentUser.email)?.[0]?.toUpperCase()
    : '';

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      }
    };
    fetchUserRole();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleSignup = () => {
    history.push('/signup');
  };

  const handleProfile = () => {
    history.push('/profile');
  };

  const handleNotifications = () => {
    history.push('/notifications');
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <Container
      fluid
      className={`${styles.customHeader} d-flex align-items-center`}
    >
      <Row noGutters className="d-flex align-items-center w-100">
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
              to="/about"
              className={`${styles.link} fs-5`}
              activeClassName={styles.activeLink}
            >
              About
            </NavLink>
            <NavLink
              to="/contactus"
              className={`${styles.link} ${styles.noWrap} fs-5`}
              activeClassName={styles.activeLink}
            >
              Contact Us
            </NavLink>
          </div>
        </Col>
        <Col
          xs="auto"
          className="d-flex align-items-center justify-content-end"
        >
          <Dropdown align="end">
            <Dropdown.Toggle
              id="dropdown-basic"
              className={styles.userCircle}
            >
              {currentUser ? firstLetter : <FaUser />}
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownMenu}>
              {currentUser ? (
                <>
                  <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                  {userRole === 'company' && (
                    <Dropdown.Item onClick={handleNotifications}>Notifications</Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={confirmLogout}>Logout</Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={handleLogin}>Login</Dropdown.Item>
                  <Dropdown.Item onClick={handleSignup}>Sign Up</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InternshipHeader;
