import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const navItems = [
    { to: "/admin-dashboard", label: "Dashboard", icon: "bi-house-door" },
    { to: "/admin/manage-users", label: "Manage Users", icon: "bi-people" },
    { to: "/badges", label: "Badge Assignment", icon: "bi-file-earmark-text" },
    { to: "/get-reports", label: "View All Reports", icon: "bi-check2-circle" },
    { to: "/admin-donations", label: "Donations Management", icon: "bi-cash-stack" },
    { to: "/admin-success-stories", label: "Success Stories", icon: "bi-award" },
  ];

  return (
    <div
      className="d-flex flex-column bg-dark text-white vh-100 position-fixed shadow"
      style={{
        width: isCollapsed ? "80px" : "240px",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Toggle Button */}
      <Button
        variant="outline-light"
        className="mb-3 text-center"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          margin: "10px auto",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
      >
        <i className={`bi ${isCollapsed ? "bi-list" : "bi-chevron-left"}`}></i>
      </Button>

      {/* Navigation Links */}
      <Nav className="flex-column">
        {navItems.map(({ to, label, icon }) => {
          const isActive = location.pathname === to;

          return (
            <Nav.Item key={to}>
              <Link
                to={to}
                className={`nav-link d-flex align-items-center ${
                  isActive ? "active bg-light text-dark" : "text-white"
                }`}
              >
                <i className={`bi ${icon} me-2`}></i>
                {!isCollapsed && label}
              </Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};

export default AdminSidebar;
