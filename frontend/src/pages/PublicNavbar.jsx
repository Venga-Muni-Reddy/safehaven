import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const PublicNavbar = ({ onProfileClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  // Only show profile on these pages
  const showProfilePages = ["/home"];
  const shouldShowProfile = showProfilePages.includes(currentPath);

  const allLinks = {
    "/home": ["Report a Case", "Success Stories", "Donation"],
    "/report-case": ["Home", "Success Stories", "Donation"],
    "/success-stories": ["Home", "Report a Case", "Donation"],
    "/donation": ["Home", "Success Stories", "Report a Case"],
  };

  const navItems = {
    Home: "/home",
    "Report a Case": "/report-case",
    "Success Stories": "/success-stories",
    Donation: "/donation",
  };

  const linksToShow =
    allLinks[currentPath] || ["Home", "Report a Case", "Success Stories", "Donation"];

  const handleLogout = () => {
    navigate("/"); // redirect to login page
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: "linear-gradient(to right, #16222A, #3A6073)",
        padding: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand text-white fw-bold"
          to="/home"
          style={{
            fontSize: "1.8rem",
            letterSpacing: "1px",
            textShadow: "1px 1px 5px rgba(255, 255, 255, 0.5)",
          }}
        >
          HopeConnect
          <span
            style={{
              display: "block",
              fontSize: "0.7rem",
              letterSpacing: "0.5px",
              color: "#f8f9fa",
              opacity: 0.8,
            }}
          >
            Together for a Better Future
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {linksToShow.map((name, index) => (
              <li key={index} className="nav-item me-3">
                <Link
                  className="btn px-4 py-2"
                  to={navItems[name]}
                  style={{
                    background: "linear-gradient(to right, #007bff, #0056b3)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    transition: "0.3s",
                    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {name}
                </Link>
              </li>
            ))}

            {/* ✅ Show only on /home or allowed paths */}
            {shouldShowProfile && (
              <li className="nav-item me-2">
                <button
                  className="btn px-4 py-2 d-flex align-items-center"
                  onClick={onProfileClick}
                  style={{
                    background: "linear-gradient(to right, #007bff, #0056b3)",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    transition: "0.3s",
                    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <i className="bi bi-person-circle me-2" style={{ fontSize: "1.2rem" }}></i>
                  Profile
                </button>
              </li>
            )}

            {/* Logout Button */}
            <li className="nav-item">
              <button
                className="btn px-4 py-2 d-flex align-items-center"
                onClick={handleLogout}
                style={{
                  background: "linear-gradient(to right, #dc3545, #b52a37)",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  transition: "0.3s",
                  boxShadow: "0 3px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <i className="bi bi-power me-2" style={{ fontSize: "1.2rem" }}></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
