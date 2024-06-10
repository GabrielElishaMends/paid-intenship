import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../firebase/config';
import styles from '../styles.module.css';
import './ApplicationForm.css';

const ApplicationForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ companyId: string }>();
  const companyId = location.state?.companyId || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    currentInstitution: '',
    degreeProgram: '',
    yearOfStudy: '',
    resume: null as File | null,
    linkedin: '',
    portfolio: '',
    certifications: [] as File[],
    experience: '',
    companyIdentifier: companyId,
    applicationStatus: 'pending',
  });
  const [alert, setAlert] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        if (id === 'formResume') {
          setFormData((prevData) => ({
            ...prevData,
            resume: files[0],
          }));
        } else if (id === 'formCertifications') {
          setFormData((prevData) => ({
            ...prevData,
            certifications: Array.from(files),
          }));
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setAlert('You must be logged in to submit the application.');
      return;
    }

    try {
      setAlert(null); // Clear any previous alerts
      let resumeUrl = '';
      const certificationUrls: string[] = [];

      if (formData.resume) {
        console.log('Uploading resume...');
        resumeUrl = await uploadFile(
          formData.resume,
          `resumes/${formData.resume.name}`
        );
        console.log('Resume uploaded:', resumeUrl);
      }

      for (const certification of formData.certifications) {
        console.log('Uploading certification:', certification.name);
        const certificationUrl = await uploadFile(
          certification,
          `certifications/${certification.name}`
        );
        certificationUrls.push(certificationUrl);
        console.log('Certification uploaded:', certificationUrl);
      }

      const applicationData = {
        ...formData,
        resume: resumeUrl,
        certifications: certificationUrls,
      };

      console.log('Submitting application data:', applicationData);
      await addDoc(collection(db, 'applications'), applicationData);
      console.log('Application submitted successfully');
      setAlert('Application submitted successfully!');
      setTimeout(() => {
        history.push('/companies');
      }, 2000);
    } catch (error) {
      console.error('Error adding document: ', error);
      setAlert('Failed to submit application. Please try again.');
    }
  };

  return (
    <Container
      fluid
      className="outer-container d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100">
        <Col xs={11} md={8} lg={6} className="mx-auto">
          <div className="text-center mb-4">
            <Link to="/" className="text-decoration-none">
              <h1 className="text-primary">PAID-INTERNSHIP</h1>
            </Link>
          </div>
          <div className="application-form p-4 rounded shadow">
            <h2 className="text-center">APPLICATION FORM</h2>
            <hr className="mb-4" />
            {alert && (
              <Alert
                variant={alert.includes('successfully') ? 'success' : 'danger'}
              >
                {alert}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="fullName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="currentInstitution" className="mb-3">
                <Form.Label>Current Institution</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter current institution"
                  value={formData.currentInstitution}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="degreeProgram" className="mb-3">
                <Form.Label>Degree Program</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter degree program"
                  value={formData.degreeProgram}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="yearOfStudy" className="mb-3">
                <Form.Label>Year of Study</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter year of study"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formResume" className="mb-3">
                <Form.Label>Resume/CV</Form.Label>
                <Form.Control type="file" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="linkedin" className="mb-3">
                <Form.Label>LinkedIn Profile (optional)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter LinkedIn profile URL"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="portfolio" className="mb-3">
                <Form.Label>Portfolio/Website (optional)</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter portfolio/website URL"
                  value={formData.portfolio}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formCertifications" className="mb-3">
                <Form.Label>Certifications</Form.Label>
                <Form.Control type="file" multiple onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="experience" className="mb-3">
                <Form.Label>Previous Internship/Work Experience</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe your experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationForm;
