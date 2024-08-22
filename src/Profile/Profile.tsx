import { useState, useEffect } from 'react';
import { useAuth } from '../Internships/AuthContext';
import { db } from '../firebase/config';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import styles from '../styles.module.css';
import './Profile.css';
import { CompanyInfo } from '../data/companyData';

interface CompanyInfoWithDescription extends CompanyInfo {
  showFullDescription: boolean;
}

const Profile = () => {
  const { currentUser, userRole } = useAuth();
  const [role, setRole] = useState('Loading...');
  const [companies, setCompanies] = useState<CompanyInfoWithDescription[]>([]);
  const [loading, setLoading] = useState(true); // New loading state
  const history = useHistory();
  const dateJoined = currentUser?.metadata?.creationTime || 'N/A';
  const lastLogin = currentUser?.metadata?.lastSignInTime || 'N/A';

  useEffect(() => {
    const fetchRole = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setRole(userDoc.data().role || 'N/A');
        } else {
          setRole('N/A');
        }
      }
    };

    const fetchCompanies = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'companies'),
          where('ownerId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const companyData: CompanyInfoWithDescription[] = [];
        querySnapshot.forEach((doc) => {
          companyData.push({
            ...doc.data(),
            id: doc.id,
            showFullDescription: false,
          } as CompanyInfoWithDescription);
        });
        setCompanies(companyData);
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchRole();
    fetchCompanies();
  }, [currentUser]);

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleEditClick = (id: string) => {
    history.push('/edit-company', { companyId: id });
  };

  const handleDeleteClick = async (id: string) => {
    if (
      window.confirm(
        'Are you sure you want to delete this company information?'
      )
    ) {
      try {
        await deleteDoc(doc(db, 'companies', id));
        setCompanies(companies.filter((company) => company.id !== id));
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  const toggleDescription = (id: string) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === id
          ? { ...company, showFullDescription: !company.showFullDescription }
          : company
      )
    );
  };

  return (
    <div className="leftSpace">
      <h1>Profile</h1>
      <p>
        <strong>Name:</strong> {currentUser.displayName || 'N/A'}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Role:</strong> {role}
      </p>
      <p>
        <strong>Date Joined:</strong> {dateJoined}
      </p>
      <p>
        <strong>Last Login:</strong> {lastLogin}
      </p>
      {userRole === 'company' && (
        <div className="mt-4">
          <Link to="/addcompany" className="btn btn-primary mb-3">
            Add Your Company's Internship Available
          </Link>
        </div>
      )}
      {userRole === 'company' && (
        <>
          <h2>Internships Added</h2>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : companies.length === 0 ? (
            <p className="text-danger">
              You have not added any Internship Application
            </p>
          ) : (
            companies.map((company) => (
              <Container
                key={company.id}
                className={`${styles.cardMargin} mb-4 ${styles.cardColor}`}
              >
                <Row className="justify-content-center">
                  <Row className="mb-1">
                    <Col className={`${styles.compName} border-bottom`}>
                      {company.companyName}
                    </Col>
                  </Row>
                </Row>
                <Row className="justify-content-center fs-5">
                  <Row>
                    <Col className="mb-1">
                      <span className="fw-bold">Location:</span>{' '}
                      {company.location}
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
                      {company.showFullDescription ? (
                        <>
                          {company.description}
                          <Button
                            variant="link"
                            onClick={() => toggleDescription(company.id)}
                            style={{ color: 'white' }}
                          >
                            See less
                          </Button>
                        </>
                      ) : (
                        <>
                          {company.description.length > 100
                            ? `${company.description.substring(0, 100)}...`
                            : company.description}
                          {company.description.length > 100 && (
                            <Button
                              variant="link"
                              onClick={() => toggleDescription(company.id)}
                              style={{ color: 'white' }}
                            >
                              See more
                            </Button>
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
                      <span className="fw-bold">Internship Type:</span>{' '}
                      {company.internshipType}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-1">
                      <span className="fw-bold">Duration:</span>{' '}
                      {company.duration}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-1">
                      <span className="fw-bold">Application Deadline:</span>{' '}
                      {company.applicationDeadline}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex gap-2">
                      <Button
                        variant="dark"
                        className="mb-1"
                        style={{ width: '120px' }}
                        onClick={() => handleEditClick(company.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mb-1"
                        style={{ width: '120px' }}
                        onClick={() => handleDeleteClick(company.id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Row>
              </Container>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
