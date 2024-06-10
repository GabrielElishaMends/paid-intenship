import React, { useEffect, useState } from 'react';
import { fetchCompanies, CompanyInfo } from '../src/data/companyData';
import CompanyBody from '../src/Companies/CompanyBody';
import { Container } from 'react-bootstrap';
import CompanyHeader from '../src/Companies/CompanyHeader';
import MarginBelowHeader from '../src/Companies/MarginBelowHeader';
import Footer from '../src/HomePage/Footer';

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
      <CompanyHeader />
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