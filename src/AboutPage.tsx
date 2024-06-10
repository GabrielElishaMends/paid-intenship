import React from 'react';
import About from './AboutPage/About';
import BelowHeaderMargin from './AboutPage/BelowHeaderMargin';
import Footer from './HomePage/Footer';
import AboutHeader from './AboutPage/AboutHeader';

const AboutPage = () => {
  return (
    <div>
      <AboutHeader />
      <BelowHeaderMargin />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
