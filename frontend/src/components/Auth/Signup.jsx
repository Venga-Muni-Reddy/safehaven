import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "Public",
    gov_id: "",
    experience: "",
    regNumber: "",
    approvalCert: "",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.address) {
      return "All fields are required.";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!formData.email.includes("@")) {
      return "Invalid email format.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setMessage({ text: validationError, type: "danger" });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/auth/signup", formData);
      setMessage({ text: data.message, type: data.message.includes("successful") ? "success" : "danger" });

      if (data.message.includes("successful")) {
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage({ text: "Signup failed. Please try again.", type: "danger" });
    }
    setLoading(false);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center text-light"
      style={{
        minHeight: "100vh",
        height: "auto",
        background: "linear-gradient(135deg, #1e3c72, #2a5298, #ff7e5f, #feb47b)",
        backgroundAttachment: "fixed",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8}>
          <Card className="shadow-lg p-4 bg-dark bg-opacity-75 text-light border border-light rounded">
            <Card.Body>
              <h2 className="text-center mb-4 text-warning fw-bold shadow-sm p-2 rounded">
                Join Our Community 🚀
              </h2>

              {message && <Alert variant={message.type} className="text-center">{message.text}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Enter your name" required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Enter password (min 6 chars)" required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" placeholder="Enter phone number" required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" placeholder="Enter address" required onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" required onChange={handleChange}>
                    <option value="Public">Public</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="NGO">NGO</option>
                  </Form.Select>
                </Form.Group>

                {formData.role === "Volunteer" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Government ID</Form.Label>
                      <Form.Control type="text" name="gov_id" placeholder="Enter government ID" required onChange={handleChange} />
                    </Form.Group>
                  </>
                )}

                {formData.role === "NGO" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>NGO Registration Number</Form.Label>
                      <Form.Control type="text" name="regNumber" placeholder="Enter registration number" required onChange={handleChange} />
                    </Form.Group>
                  </>
                )}

                <Button variant="warning" type="submit" className="w-100 fw-bold" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
                </Button>
              </Form>

              <p className="text-center mt-3">
                Already have an account? <Link to="/login" className="text-info">Go to Login</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
