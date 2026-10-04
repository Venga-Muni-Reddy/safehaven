import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";

function NgoNavbar() {
  const location = useLocation(); // Get current route

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-lg">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/ngo-home" className="fw-bold fs-4 text-light">
          🌍 Helping Hands
        </Navbar.Brand>

        {/* Navbar Toggler for Mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Show "Home" only if not already on home page */}
            {location.pathname !== "/ngo-home" && (
              <Nav.Link as={Link} to="/ngo-home" className="mx-2 fw-semibold">
                <FaHome className="me-1" /> Home
              </Nav.Link>
            )}

            {/* Profile Dropdown */}
            <NavDropdown
              title={<><FaUser className="me-1" /> Profile</>}
              id="profile-dropdown"
              className="mx-2 fw-semibold"
            >
              <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">
                <FaSignOutAlt className="me-1" /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NgoNavbar;
