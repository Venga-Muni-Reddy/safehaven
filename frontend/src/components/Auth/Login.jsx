import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [imageSwap, setImageSwap] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("/auth/login", formData);

        // ✅ Ensure response has the expected data
        if (response.status === 200 && response.data) {
            setMessage({ text: "Login successful! Redirecting...", type: "success" });

            
            const { role,name,email,userId } = response.data;
            dispatch(loginSuccess({ user: { role,name,email,userId } }));

            setTimeout(() => {
                if (role === "Admin") navigate("/admin-dashboard");
                else if (role === "Volunteer") navigate("/volunteer-home");
                else if (role === "NGO") navigate("/ngo-home");
                else navigate("/home");
            }, 2000);
        } else {
            // ✅ Handle unexpected responses
            setMessage({ text: "Unexpected response. Please try again.", type: "danger" });
        }
    } catch (error) {
        console.error("Login Error:", error);

        if (error.response) {
            if (error.response.status === 401) {
                setMessage({ text: "Invalid email or password.", type: "danger" });
            } else if (error.response.status === 403) {
                setMessage({ text: "Your account is not approved.", type: "warning" });
            } else {
                setMessage({ text: "Login failed. Please try again.", type: "danger" });
            }
        } else {
            setMessage({ text: "Server error. Please try again later.", type: "danger" });
        }
    }
};


  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4, #ffdde1)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      {/* Left Side: Hands Giving Food */}
      <img
        src={
          imageSwap
            ? "https://img.lovepik.com/photo/50189/4266.jpg_wh860.jpg"
            : "https://t4.ftcdn.net/jpg/11/72/59/11/360_F_1172591139_wDQMsE541VoyaE0RpHvRpZSILm2DIkb2.jpg"
        }
        alt="Hands Giving Food"
        onMouseEnter={() => setImageSwap(true)}
        onMouseLeave={() => setImageSwap(false)}
        style={{
          position: "absolute",
          left: "5%",
          bottom: "15%",
          width: "350px",
          height: "350px",
          objectFit: "cover",
          opacity: "0.95",
          borderRadius: "12px",
          boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Right Side: Shelter for the Homeless */}
      <img
        src={
          imageSwap
            ? "https://t4.ftcdn.net/jpg/11/72/59/11/360_F_1172591139_wDQMsE541VoyaE0RpHvRpZSILm2DIkb2.jpg"
            : "https://img.lovepik.com/photo/50189/4266.jpg_wh860.jpg"
        }
        alt="Shelter for Homeless"
        onMouseEnter={() => setImageSwap(true)}
        onMouseLeave={() => setImageSwap(false)}
        style={{
          position: "absolute",
          right: "5%",
          bottom: "15%",
          width: "350px",
          height: "350px",
          objectFit: "cover",
          opacity: "0.95",
          borderRadius: "12px",
          boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease-in-out",
        }}
      />

      {/* Marquee Slogan */}
      <div className="overflow-hidden w-100 text-center">
        <marquee
          className="fw-bold"
          style={{
            color: "purple",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "3px 3px 6px rgba(0, 0, 0, 0.5)",
          }}
        >
          🌟 Empower Lives, One Step at a Time. 🌟
        </marquee>
      </div>

      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card
            className="p-4 mx-auto border-0 shadow-lg rounded-4"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderLeft: "5px solid #ff4d4d",
              borderRight: "5px solid #33cc33",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Card.Body className="text-center">
              <h2 className="fw-bold text-primary">Welcome to CareNest</h2>
              <h2 className="fw-bold text-primary">It's time to login</h2>

              {message && <Alert variant={message.type}>{message.text}</Alert>}

              {/* Login Form */}
              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group className="mb-3 text-start">
                  <Form.Label className="fw-bold text-dark">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onChange={handleChange}
                    className="rounded-pill border-2 border-danger"
                  />
                </Form.Group>

                <Form.Group className="mb-3 text-start">
                  <Form.Label className="fw-bold text-dark">Password</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      required
                      onChange={handleChange}
                      className="rounded-start-pill border-2 border-success"
                    />
                    <span className="input-group-text bg-transparent border-2 border-success rounded-end-pill">
                      <FaLock color="black" />
                    </span>
                  </div>
                </Form.Group>

                <Button
                  variant="danger"
                  type="submit"
                  className="w-100 rounded-pill fw-bold"
                  style={{ boxShadow: "0px 5px 15px rgba(255, 77, 77, 0.6)" }}
                >
                  Login
                </Button>
              </Form>

              {/* Sign Up Link */}
              <p className="text-center mt-3 text-dark">
                Don't have an account?
                <Link to="/signup" className="text-success ms-2 fw-bold">
                  Sign Up
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
