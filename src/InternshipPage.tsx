import React, { useEffect, useState } from 'react';
import { fetchCompanies, CompanyInfo } from './data/companyData';
import CompanyBody from './Internships/InternshipBody';
import { Container } from 'react-bootstrap';
import InternshipHeader from './Internships/InternshipHeader';
import MarginBelowHeader from './Internships/MarginBelowHeader';
import Footer from './HomePage/Footer';

const CompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    loadCompanies();
  }, []);

  return (
    <>
      <InternshipHeader />
      <MarginBelowHeader />
      <Container>
        {error && <p className="text-danger">{error}</p>}
        {companies.map((company, index) => (
          <CompanyBody key={index} company={company} />
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default CompanyPage;
