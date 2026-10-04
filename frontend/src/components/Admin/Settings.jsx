// src/pages/Settings.js
import React from 'react';
import { useState } from 'react';
import { Modal, Button, Container, Row, Col, Form, Dropdown } from 'react-bootstrap';

const Settings = ({ show, handleClose }) => {
  const [theme, setTheme] = useState('light');
  const [notification, setNotification] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={6}>
              <h4>General Settings</h4>
              <Form.Group controlId="themeToggle">
                <Form.Label>Theme</Form.Label>
                <Button variant="secondary" onClick={handleThemeChange}>
                  Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Button>
              </Form.Group>

              <Form.Group controlId="notificationToggle">
                <Form.Label>Notifications</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Enable Notifications"
                  checked={notification}
                  onChange={() => setNotification(!notification)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <h4>Language & Region</h4>
              <Form.Group controlId="languageSelect">
                <Form.Label>Language</Form.Label>
                <Dropdown onSelect={(e) => setLanguage(e)}>
                  <Dropdown.Toggle variant="success" id="language-dropdown">
                    {language}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="English">English</Dropdown.Item>
                    <Dropdown.Item eventKey="Spanish">Spanish</Dropdown.Item>
                    <Dropdown.Item eventKey="French">French</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="bi bi-x-circle me-2"></i> Close
        </Button>
        <Button variant="primary">
          Save Settings
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;
