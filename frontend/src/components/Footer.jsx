import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <Container>
        <Row>
          <Col>
            <p>&copy; 2025 Your Organization. All rights reserved.</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <a href="/terms" className="text-white me-3">Terms</a>
            <a href="/privacy" className="text-white me-3">Privacy Policy</a>
            <a href="/support" className="text-white">Support</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
