import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white p-3 min-vh-100">
          <h4 className="text-center">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/approve-registrations" className="nav-link text-white">
                Approve Registrations
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/get-reports" className="nav-link text-white">
                View Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/badges" className="nav-link text-white">
                Assign Badge
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delete-reports" className="nav-link text-white">
                Delete Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/case-feedback" className="nav-link text-white">
                Case Feedback
              </Link>
            </li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <h2 className="mb-4">Admin Dashboard</h2>
          <Row>
            {/* Feature Cards */}
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Approve Registrations</Card.Title>
                  <Card.Text>
                    Approve or reject NGO and volunteer registrations.
                  </Card.Text>
                  <Link to="/approve-registrations">
                    <Button variant="primary">Go to Approvals</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>View Reports</Card.Title>
                  <Card.Text>
                    See all reported cases with their details.
                  </Card.Text>
                  <Link to="/view-reports">
                    <Button variant="info">View Reports</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Assign Badges</Card.Title>
                  <Card.Text>
                    Reward volunteers for their contributions.
                  </Card.Text>
                  <Link to="/badges">
                    <Button variant="success">Manage Badges</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Reports Table */}
          <h4>Reported Cases</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Case Title</th>
                <th>Reported By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Food Assistance Needed</td>
                <td>User123</td>
                <td>Pending</td>
                <td>
                  <Button variant="danger" size="sm">Delete</Button>
                  <Link to="/view-case/1">
                    <Button variant="primary" size="sm" className="ms-2">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
              {/* Add more rows dynamically */}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
