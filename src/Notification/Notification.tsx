import React, { useState, useEffect } from 'react';
import { useAuth } from '../Internships/AuthContext';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import './Notification.css';

interface NotificationData {
  id: string;
  studentName: string;
  studentEmail: string;
  phone?: string;
  currentInstitution?: string;
  degreeProgram?: string;
  yearOfStudy?: string;
  linkedin?: string;
  portfolio?: string;
  experience?: string;
  resume?: string;
  certifications: string[];
  companyId: string;
}

const Notification: React.FC = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        try {
          console.log('Fetching company for user:', currentUser.uid);

          // Query for the company document based on the ownerId
          const companyQuery = query(
            collection(db, 'companies'),
            where('ownerId', '==', currentUser.uid)
          );

          const companySnapshot = await getDocs(companyQuery);

          if (!companySnapshot.empty) {
            const companyDoc = companySnapshot.docs[0];
            const companyId = companyDoc.id; // Get the company document ID

            console.log('Fetching notifications for company ID:', companyId);

            // Query for notifications based on the company ID
            const notificationsQuery = query(
              collection(db, 'notifications'),
              where('companyId', '==', companyId) // Fetch notifications for the company ID
            );

            const notificationsSnapshot = await getDocs(notificationsQuery);

            const notificationsData: NotificationData[] = notificationsSnapshot.docs.map((doc) => ({
              id: doc.id,
              studentName: doc.data().studentName || '',
              studentEmail: doc.data().studentEmail || '',
              phone: doc.data().phone || '',
              currentInstitution: doc.data().currentInstitution || '',
              degreeProgram: doc.data().degreeProgram || '',
              yearOfStudy: doc.data().yearOfStudy || '',
              linkedin: doc.data().linkedin || '',
              portfolio: doc.data().portfolio || '',
              experience: doc.data().experience || '',
              resume: doc.data().resume || '',
              certifications: doc.data().certifications || [],
              companyId: doc.data().companyId || '', // Include companyId in the fetched data
            }));

            console.log('Notifications Data:', notificationsData);
            console.log('Number of notifications:', notificationsData.length);
            setNotifications(notificationsData);
          } else {
            setError('No company found for the current user.');
          }
        } catch (err) {
          console.error('Error fetching notifications:', err);
          setError('Failed to load notifications. Please try again later.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotifications();
  }, [currentUser]);

  if (loading) {
    return (
      <Container className="notification-page bottomSpace">
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading notifications...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="notification-page">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  console.log('Number of notifications in render:', notifications.length);

  return (
    <Container className="notification-page">
      <h1 className="text-center mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <h3 className="text-center mb-5 notify">
          No notifications available.
        </h3>
      ) : (
        <Row>
          {notifications.map((notification) => (
            <Col key={notification.id} md={6} lg={4} className="mb-4">
              <Card className="notification-card">
                <Card.Body>
                  <Card.Title>{notification.studentName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {notification.studentEmail}
                  </Card.Subtitle>
                  <Card.Text>
                    {notification.phone && (
                      <>
                        <strong>Phone:</strong> {notification.phone} <br />
                      </>
                    )}
                    {notification.currentInstitution && (
                      <>
                        <strong>Institution:</strong> {notification.currentInstitution} <br />
                      </>
                    )}
                    {notification.degreeProgram && (
                      <>
                        <strong>Degree Program:</strong> {notification.degreeProgram} <br />
                      </>
                    )}
                    {notification.yearOfStudy && (
                      <>
                        <strong>Year of Study:</strong> {notification.yearOfStudy} <br />
                      </>
                    )}
                    {notification.linkedin && (
                      <>
                        <strong>LinkedIn:</strong> <a href={notification.linkedin} target="_blank" rel="noopener noreferrer">{notification.linkedin}</a> <br />
                      </>
                    )}
                    {notification.portfolio && (
                      <>
                        <strong>Portfolio:</strong> <a href={notification.portfolio} target="_blank" rel="noopener noreferrer">{notification.portfolio}</a> <br />
                      </>
                    )}
                    {notification.experience && (
                      <>
                        <strong>Experience:</strong> {notification.experience} <br />
                      </>
                    )}
                    {notification.resume && (
                      <>
                        <strong>Resume:</strong> <a href={notification.resume} target="_blank" rel="noopener noreferrer">View Resume</a> <br />
                      </>
                    )}
                    {notification.certifications.length > 0 && (
                      <>
                        <strong>Certifications:</strong>
                        {notification.certifications.map((certUrl, index) => (
                          <div key={index}>
                            <a href={certUrl} target="_blank" rel="noopener noreferrer">
                              View Certification {index + 1}
                            </a>
                          </div>
                        ))}
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Notification;
