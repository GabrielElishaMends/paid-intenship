// src/CompanyPage.tsx
import React, { useEffect, useState } from 'react';
import { CompanyInfo, fetchCompanies } from './data/companyData';
import CompanyBody from './Internships/InternshipBody';
import { Container, Spinner } from 'react-bootstrap';
import InternshipHeader from './Internships/InternshipHeader';
import MarginBelowHeader from './Internships/MarginBelowHeader';
import Footer from './HomePage/Footer';

const InternshipPage: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <InternshipHeader />
      <MarginBelowHeader />
      <main className="main-content">
        <Container>
          {error && <p className="text-danger">{error}</p>}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            companies.map((company, index) => (
              <CompanyBody key={index} company={company} />
            ))
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default InternshipPage;
