import React from 'react';
import styles from '../styles.module.css';
import { Col, Container, Image, Row } from 'react-bootstrap';

const HomeBody = () => {
  return (
    <Container fluid className={`${styles.containerWithMargin} overflow-hidden`}>
      <Row>
        <Col>
          <Image src="./image/imgHome.jpg" className={styles.negmarginLeft} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={`${styles.onImage} w-100 text-left`}>APPLY FOR PAID INTERNSHIPS HERE</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={`${styles.onSubImage} ${styles.noTextWrap} w-100 text-left`}>Bridging the gap between Students and Companies</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeBody;
