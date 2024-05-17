import React from 'react';
import styles from '../styles.module.css';
import { Col, Container, Image, Row } from 'react-bootstrap';

const Body = () => {
  return (
    <Container fluid className={`${styles.containerWithMargin} overflow-hidden`}>
      <Row>
        <Col>
          <Image src="/imgHome1.jpg" className={styles.negmarginLeft} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={`${styles.onImage} ${styles.noTextWrap} text-white w-100 text-center`}>APPLY FOR PAID INTENSHIPS HERE</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
