import React from 'react';
import HomeHeader from './HomePage/HomeHeader';
import HomeBody from './HomePage/HomeBody';
import Footer from './LandingPage/Footer';
import MarginBelowHeader from './HomePage/MarginBelowHeader';

const HomePage = () => {
  return (
    <div>
      <HomeHeader />
      <MarginBelowHeader />
      <HomeBody name={"Hello"}/>
      <HomeBody name={"Joel"}/>
      <Footer />
    </div>
  );
};

export default HomePage;
