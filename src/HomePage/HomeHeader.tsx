import React, { useState, useEffect } from 'react';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row, Dropdown, Modal, Button } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../Internships/AuthContext';
import { FaUser } from 'react-icons/fa'; // Import the user icon
import { getAuth } from 'firebase/auth'; // Correct import for Firebase Authentication
import { db } from '../firebase/config'; // Import your Firestore configuration
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const HomeHeader = () => {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const history = useHistory();
  const auth = getAuth(); // Initialize Firebase Authentication
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

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

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
              className={`${styles.link} ${styles.noWrap} fs-5`}
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
            {!currentUser && (
              <>
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
              </>
            )}
            {currentUser && (
              <Dropdown align="end">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className={`${styles.userCircle} ${styles.homeUserCircle}`}
                >
                  {firstLetter ? firstLetter : <FaUser />}
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item as={NavLink} to="/profile">
                    Profile
                  </Dropdown.Item>
                  {userRole === 'company' && (
                    <Dropdown.Item as={NavLink} to="/notifications">
                      Notifications
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={confirmLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
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

export default HomeHeader;
