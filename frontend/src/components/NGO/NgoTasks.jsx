import React, { useEffect, useState } from "react";
import axios from "axios";
import NgoNavbar from "./NgoNavbar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const NgoTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [parrotPosition, setParrotPosition] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [rotate, setRotate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `/api/ngo-tasks/tasks?status=${statusFilter}`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Simulate parrot movement using inline styles and Bootstrap animations
  useEffect(() => {
    const interval = setInterval(() => {
      setParrotPosition((prev) => {
        if (prev >= 100 && !reverse) {
          setReverse(true);
          return 100;
        } else if (prev <= 0 && reverse) {
          setReverse(false);
          return 0;
        }
        return reverse ? prev - 1 : prev + 1;
      });
    }, 50); // Smooth animation

    return () => clearInterval(interval);
  }, [reverse]);

  // Rotate text effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => prev + 10);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NgoNavbar />

      <div
        className="container"
        style={{
          marginTop: "100px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="mt-4" style={{ flex: 1 }}>
          <h2 className="mb-4 text-center text-primary">NGO Assigned Tasks</h2>

          <div className="row mb-4">
            <div className="col-md-6 offset-md-3">
              <label className="form-label text-info">Filter by Status:</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Task ID</th>
                      <th>Report ID</th>
                      <th>Volunteer</th>
                      <th>Contact</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.id}</td>
                          <td>{task.reportCase.id}</td>
                          <td>{task.volunteerName}</td>
                          <td>{task.volunteerContact}</td>
                          <td>
                            <span
                              className={`badge bg-${
                                task.status === "Pending"
                                  ? "warning"
                                  : task.status === "InProgress"
                                  ? "info"
                                  : "success"
                              }`}
                            >
                              {task.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No tasks found for status: {statusFilter}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Parrots Flying Animation Using Bootstrap Only */}
          <div className="d-flex justify-content-center my-4">
            <div
              className="position-relative w-100"
              style={{ height: "80px", overflow: "hidden" }}
            >
              <div
                className="position-absolute"
                style={{
                  left: `${parrotPosition}%`,
                  transition: "left 0.05s linear",
                  fontSize: "3rem",
                  transform: reverse ? "scaleX(-1)" : "scaleX(1)",
                }}
              >
                <span className="mx-2">🦜</span>
                <span className="mx-2">🦜</span>
                <span className="mx-2">🦜</span>
                <span className="mx-2">🦜</span>
                <span className="mx-2">🦜</span>
              </div>
            </div>
          </div>
        </div>

        {/* NGO Impact Section */}
        <div className="container my-5">
          <div className="text-center mb-4">
            <h4 className="text-success">Our Impact in Action</h4>
            <p className="text-muted">Together, we’re transforming lives.</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card border-primary bg-light shadow h-100 animate__animated animate__fadeInUp">
                <div className="card-body text-center">
                  <h2 className="text-primary fw-bold">215</h2>
                  <p className="card-text">Tasks Completed</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-success bg-light shadow h-100 animate__animated animate__fadeInUp">
                <div className="card-body text-center">
                  <h2 className="text-success fw-bold">52</h2>
                  <p className="card-text">Volunteers Engaged</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-danger bg-light shadow h-100 animate__animated animate__fadeInUp">
                <div className="card-body text-center">
                  <h2 className="text-danger fw-bold">320+</h2>
                  <p className="card-text">Lives Impacted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button with Rotating "+" and Circular Text */}
      <button
        type="button"
        className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle fs-4 fw-bold shadow"
        style={{
          width: "60px",
          height: "60px",
          zIndex: 1030,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        onClick={() => navigate("/ngo-reports")}
      >
        {/* Rotating + Symbol */}
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            transform: `rotate(${rotate}deg)`,
            transition: "transform 0.2s ease-in-out",
            whiteSpace: "nowrap",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          +
        </div>
        {/* Circular rotating text */}
        <div
          className="circular-text"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
            animation: "rotateText 5s linear infinite",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
        >
          <span>Assign New Task</span>
        </div>
      </button>

      <Footer className="fixed-bottom w-100 bg-dark py-3 text-center text-light shadow-lg" />

      <style>
        {`
          @keyframes rotateText {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .circular-text {
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            text-align: center;
            line-height: 30px;
            animation: rotateText 5s linear infinite;
          }
        `}
      </style>
    </>
  );
};

export default NgoTasks;
