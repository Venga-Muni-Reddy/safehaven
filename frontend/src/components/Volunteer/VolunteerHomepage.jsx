import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import Footer from '../Footer';
import 'animate.css';
import VolunteerNavbar from './VolunteerNavbar';

const VolunteerHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get user data from Redux store

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow">
          <div className="container-fluid">
            <span className="navbar-brand d-flex align-items-center animate__animated animate__fadeInLeft">
              <i className="bi bi-heart-fill me-2 fs-4"></i>
              <span className="fs-5">Volunteer Portal</span>
            </span>

            <div className="mx-auto d-none d-lg-block animate__animated animate__fadeInDown">
              <span className="text-light fw-semibold fst-italic">
                “Be the reason someone smiles today ❤️”
              </span>
            </div>

            <div className="d-flex">
              <button
                className="btn btn-outline-light animate__animated animate__fadeInRight"
                onClick={handleLogout}
              >
                🔓 Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content with Gradient Background */}
        <main className="flex-grow-1 bg-light" style={{ background: 'linear-gradient(45deg, #ff7f50, #ff6347, #6a89cc)' }}>
        <div className="text-center my-4 px-3">
  <h2
    className="animate__animated animate__fadeInDown text-center"
    style={{ color: 'purple', textShadow: '2px 2px 5px rgba(0,0,0,0.3)' }}
  >
    Welcome, {user ? user.name : "Volunteer"}! 🙌
  </h2>
  <p
    className="lead animate__animated animate__fadeIn"
    style={{ color: 'purple', textShadow: '2px 2px 5px rgba(0,0,0,0.3)' }}
  >
    Here’s your dashboard to make an impact!
  </p>
</div>


          {/* Feature Cards with Animation */}
          <div className="container mb-4">
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {/* Update Tasks */}
              <div className="col animate__animated animate__slideInUp animate__delay-1s">
                <div className="card h-100 border-success shadow-lg">
                  <div className="card-body text-center bg-success bg-opacity-10">
                    <i className="bi bi-pencil-square display-5 text-success mb-3"></i>
                    <h5 className="card-title">Update Task Status</h5>
                    <p className="card-text">Mark tasks as "In Progress" or "Completed".</p>
                    <Link to="/volunteer-tasks" className="btn btn-outline-success">Update Tasks</Link>
                  </div>
                </div>
              </div>

              {/* View Badges */}
              <div className="col animate__animated animate__slideInUp animate__delay-2s">
                <div className="card h-100 border-warning shadow-lg">
                  <div className="card-body text-center bg-warning bg-opacity-10">
                    <i className="bi bi-award-fill display-5 text-warning mb-3"></i>
                    <h5 className="card-title">View Badges</h5>
                    <p className="card-text">Celebrate your achievements and milestones.</p>
                    <Link to="/volunteer-badges" className="btn btn-outline-warning">View Badges</Link>
                  </div>
                </div>
              </div>

              {/* Contact NGO */}
              <div className="col animate__animated animate__slideInUp animate__delay-3s">
                <div className="card h-100 border-info shadow-lg">
                  <div className="card-body text-center bg-info bg-opacity-10">
                    <i className="bi bi-telephone-fill display-5 text-info mb-3"></i>
                    <h5 className="card-title">Contact NGO</h5>
                    <p className="card-text">Connect directly with your NGO coordinator.</p>
                    <Link to="/ngo-contact" className="btn btn-outline-info">Contact</Link>
                  </div>
                </div>
              </div>

              {/* Volunteer Calendar */}
              <div className="col animate__animated animate__slideInUp animate__delay-4s">
                <div className="card h-100 border-danger shadow-lg">
                  <div className="card-body text-center bg-danger bg-opacity-10">
                    <i className="bi bi-calendar-event-fill display-5 text-danger mb-3"></i>
                    <h5 className="card-title">Volunteer Calendar</h5>
                    <p className="card-text">Set availability and manage upcoming cases.</p>
                    <Link to="/volunteer-calendar" className="btn btn-outline-danger">Open Calendar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Impact and Initiatives */}
          <div className="container my-5">
            <div className="p-4 rounded shadow-lg text-center bg-white animate__animated animate__zoomIn" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1))' }}>
              <h4 className="mb-3 text-primary fw-bold">Volunteer Impact and Initiatives 🌍</h4>
              <p className="text-secondary mb-4">
                Discover the change you’re creating by participating in impactful volunteer initiatives.
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
                <div className="border rounded p-3 bg-success bg-opacity-10 shadow-sm">
                  <i className="bi bi-globe display-6 text-success mb-2"></i>
                  <h6>Global Impact</h6>
                  <p className="small text-muted">Help make a difference in communities around the world.</p>
                </div>
                <div className="border rounded p-3 bg-warning bg-opacity-10 shadow-sm">
                  <i className="bi bi-people-fill display-6 text-warning mb-2"></i>
                  <h6>Community Engagement</h6>
                  <p className="small text-muted">Strengthen your community through active participation.</p>
                </div>
                <div className="border rounded p-3 bg-info bg-opacity-10 shadow-sm">
                  <i className="bi bi-hand-thumbs-up display-6 text-info mb-2"></i>
                  <h6>Collaborative Efforts</h6>
                  <p className="small text-muted">Work together to achieve shared goals and support others.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Volunteer Spotlight & Leaderboard Section */}
<div className="container my-5">
  <div className="p-4 rounded shadow-lg bg-light text-center animate__animated animate__fadeInUp">
    <h4 className="mb-3 text-info fw-bold">🌟 Volunteer Spotlight & Leaderboard</h4>
    <p className="text-muted mb-4">
      Every contribution matters, but some shine a little brighter. Let’s celebrate this month’s top volunteers!
    </p>
    <div className="table-responsive">
      <table className="table table-hover border rounded shadow-sm">
        <thead className="table-info">
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Volunteer</th>
            <th scope="col">Tasks Completed</th>
            <th scope="col">Impact Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>🥇 1</td>
            <td>Aarav Mehta</td>
            <td>45</td>
            <td>980</td>
          </tr>
          <tr>
            <td>🥈 2</td>
            <td>Diya Sharma</td>
            <td>40</td>
            <td>920</td>
          </tr>
          <tr>
            <td>🥉 3</td>
            <td>Rohit Sen</td>
            <td>38</td>
            <td>910</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="text-success mt-3">👏 Keep up the amazing work, heroes!</p>
  </div>
</div>


          {/* Bottom Creative Section with Gradient */}
          <div className="container my-5">
            <div className="p-4 rounded shadow-lg text-center bg-white animate__animated animate__zoomIn" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1))' }}>
              <h4 className="mb-3 text-primary fw-bold">Your Journey as a Hero Begins Here 🦸‍♀️🦸‍♂️</h4>
              <p className="text-secondary mb-4">
                Track your progress, connect with your team, and grow your impact with every task you complete.
              </p>
              <div className="d-flex flex-column flex-md-row justify-content-center gap-4">
                <div className="border rounded p-3 bg-success bg-opacity-10 shadow-sm">
                  <i className="bi bi-graph-up-arrow display-6 text-success mb-2"></i>
                  <h6>Impact Analytics</h6>
                  <p className="small text-muted">Visualize your contributions over time.</p>
                </div>
                <div className="border rounded p-3 bg-warning bg-opacity-10 shadow-sm">
                  <i className="bi bi-stars display-6 text-warning mb-2"></i>
                  <h6>Volunteer Milestones</h6>
                  <p className="small text-muted">Earn badges as you grow your footprint.</p>
                </div>
                <div className="border rounded p-3 bg-danger bg-opacity-10 shadow-sm">
                  <i className="bi bi-chat-heart-fill display-6 text-danger mb-2"></i>
                  <h6>Community Voice</h6>
                  <p className="small text-muted">Share and read motivational stories.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default VolunteerHomepage;
