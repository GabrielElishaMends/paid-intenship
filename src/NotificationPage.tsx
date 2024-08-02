import React from 'react';
import InternshipHeader from './Internships/InternshipHeader';
import MarginBelowHeader from './Internships/MarginBelowHeader';
import Notification from './Notification/Notification';
import Footer from './HomePage/Footer';

const NotificationPage = () => {
  return (
    <div>
      <InternshipHeader />
      <MarginBelowHeader />
      <Notification />
      <Footer />
    </div>
  );
}

export default NotificationPage;
