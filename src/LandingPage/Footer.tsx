import React from 'react';
import styles from '../styles.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="bg-dark text-white">
      <Row className='mb-4'>
        <Col>
          <Row className='fw-bold mb-4 ml-1'>CONTACT US</Row>
          <Row className='fw-light'>KWAME NKRUMAH UNIVERSITY OF SCIENCE AND TECHNOLOGY</Row>
          <Row className='fw-light mb-3'>KUMASI, AYEDUASE</Row>
          <Row className='fw-light'>PHONE: +233-000-111-222</Row>
          <Row className='fw-light'>EMAIL: PAIDINTENSHIP@GMAIL.COM</Row>
        </Col>
        <Col>
          <Row className='fw-bold mb-4'>MENU</Row>
          <Row className='fw-light mb-2'>HOME</Row>
          <Row className='fw-light mb-2'>SERVICE</Row>
          <Row className='fw-light mb-2'>ABOUT</Row>
        </Col>
        <Col>
          <Row className='fw-bold mb-4'>CONNECT WITH US</Row>
          <Row className='fw-light mb-2'>FACEBOOK</Row>
          <Row className='fw-light mb-2'>X</Row>
          <Row className='fw-light mb-2'>INSTAGRAM</Row>
          <Row className='fw-light mb-2'>LINKEDIN</Row>
        </Col>
      </Row>
      <Row className='justify-content-center fw-bold'>&copy; 2024 paid intenship</Row>
    </Container>
  );
};

export default Footer;
