import React from 'react';
import About from './AboutPage/About';
import BelowHeaderMargin from './AboutPage/BelowHeaderMargin';
import Footer from './HomePage/Footer';
import InternshipHeader from './Internships/InternshipHeader';

const AboutPage = () => {
  return (
    <div>
      <InternshipHeader />
      <BelowHeaderMargin />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
