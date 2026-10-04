import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Profile from "../../pages/Profile";  // Import the Profile component
import Settings from "./Settings";  // Import the Settings component

const AdminNavbar = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // State to handle the profile modal visibility
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false); // State for Settings modal visibility

  // Handle search action
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
      // You can call an API here or filter data based on searchQuery
      // Example: axios.get(`/api/search?query=${searchQuery}`)
    } else {
      console.log("Search query is empty.");
    }
  };

  // Handle the profile modal visibility
  const handleProfileModalClose = () => setShowProfileModal(false);
  const handleProfileModalShow = () => setShowProfileModal(true);

  // Handle the settings modal visibility
  const handleSettingsModalClose = () => setShowSettingsModal(false);
  const handleSettingsModalShow = () => setShowSettingsModal(true);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      {/* Logo & Branding */}
      <Navbar.Brand href="#">SafeHeaven Admin</Navbar.Brand>

      {/* Toggle Button for Mobile View */}
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          {/* Search Bar */}
          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update the search query on input change
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>

          {/* Notifications Bell Icon */}
          <Nav.Link href="#">
            <i className="bi bi-bell" style={{ fontSize: "1.2rem" }}></i>
          </Nav.Link>

          {/* Admin Profile Dropdown */}
          <NavDropdown title="Admin" id="admin-dropdown">
            <NavDropdown.Item onClick={handleProfileModalShow}>Profile</NavDropdown.Item> {/* Show Profile Modal */}
            <NavDropdown.Item onClick={handleSettingsModalShow}>Settings</NavDropdown.Item> {/* Show Settings Modal */}
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      
      {/* Profile Modal */}
      <Profile show={showProfileModal} handleClose={handleProfileModalClose} />
      
      {/* Settings Modal */}
      <Settings show={showSettingsModal} handleClose={handleSettingsModalClose} />
    </Navbar>
  );
};

export default AdminNavbar;
