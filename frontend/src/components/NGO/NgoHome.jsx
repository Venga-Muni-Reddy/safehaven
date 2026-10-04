import React from "react";
import { Link } from "react-router-dom";
import {
  FaTasks,
  FaClipboardList,
  FaRegHeart,
  FaRegNewspaper,
} from "react-icons/fa";
import NgoNavbar from "./NgoNavbar";
import Footer from "../Footer";

function NgoHome() {
  return (
    <>
      <NgoNavbar />
      <div className="container mt-5 pt-5">
        <h2 className="text-center mb-4">NGO Dashboard</h2>

        <div className="row">
          {/* Access Reported Cases */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <FaClipboardList size={50} className="text-primary mb-3" />
                <h5 className="card-title">Access Reported Cases</h5>
                <p className="card-text">
                  View and manage cases assigned to your NGO with full details.
                </p>
                <Link to="/ngo-reports" className="btn btn-primary">
                  View Cases
                </Link>
              </div>
            </div>
          </div>

          {/* Send Thank You Card */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <FaRegHeart size={50} className="text-success mb-3" />
                <h5 className="card-title">Send Thank You Card</h5>
                <p className="card-text">
                  Appreciate volunteers with a virtual thank you card after case completion.
                </p>
                <Link to="/send-thankyou-card" className="btn btn-success">
                  Send Card
                </Link>
              </div>
            </div>
          </div>

          {/* Assign Tasks to Volunteers */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <FaTasks size={50} className="text-warning mb-3" />
                <h5 className="card-title">Monitors Case Progress</h5>
                <p className="card-text">
                  Allocate specific tasks to volunteers efficiently.
                </p>
                <Link to="/ngo-tasks" className="btn btn-warning">
                  Track Progress
                </Link>
              </div>
            </div>
          </div>

          {/* Share Success Stories */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div className="card-body text-center">
                <FaRegNewspaper size={50} className="text-danger mb-3" />
                <h5 className="card-title">Share Success Stories</h5>
                <p className="card-text">
                  Post updates to inspire public participation.
                </p>
                <Link to="/ngo-add-story" className="btn btn-danger">
                  Share Stories
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="container my-5 py-5">
          <h3 className="text-center mb-4">Our Impact</h3>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <h5>Cases Resolved</h5>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "85%" }}
                >
                  85%
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Active Volunteers</h5>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "70%" }}
                >
                  70%
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Funds Collected</h5>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  role="progressbar"
                  style={{ width: "90%" }}
                >
                  90%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NgoHome;
