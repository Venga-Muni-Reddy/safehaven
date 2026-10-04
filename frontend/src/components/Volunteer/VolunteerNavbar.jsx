import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const VolunteerNavbar = () => {
  const location = useLocation();

  // Define all navigation options
  const navOptions = [
    { label: 'Home', path: '/volunteer-home' },
    { label: 'View Cases', path: '/ngo-reports' },
    { label: 'Update Tasks', path: '/volunteer-tasks' },
    { label: 'View Badges', path: '/volunteer-badges' },
    { label: 'Contact NGO', path: '/ngo-contact' },
    { label: 'Volunteer Calendar', path: '/volunteer-calendar' },
  ];

  // Filter out the current page's navigation option
  const filteredOptions = navOptions.filter(option => 
    option.path !== location.pathname
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand d-flex align-items-center">
          <i className="bi bi-heart-fill me-2 fs-4"></i>
          <span className="fs-5">Volunteer Portal</span>
        </span>

        {/* Tagline - Visible only on larger screens */}
        <div className="mx-auto d-none d-lg-block">
          <span className="text-light fw-semibold fst-italic">
            “Be the reason someone smiles today ❤️”
          </span>
        </div>

        <div className="d-flex">
          {/* Collapsible Menu */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {filteredOptions.map(option => (
                <li className="nav-item" key={option.path}>
                  <Link 
                    className={`nav-link ${location.pathname === option.path ? 'active' : ''}`}
                    to={option.path}
                  >
                    {option.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default VolunteerNavbar;
