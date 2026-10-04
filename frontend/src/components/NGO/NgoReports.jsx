import React, { useEffect, useState } from "react";
import axios from "axios";
import NgoNavbar from "./NgoNavbar";
import { Modal, Button } from "react-bootstrap";

const NgoReports = () => {
  const [reports, setReports] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedVolunteerId, setSelectedVolunteerId] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchReports();
    fetchVolunteers();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("/api/reports/unassigned");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("/auth/volunteers");
      setVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const fetchAvailability = async (volunteerId) => {
    try {
      const response = await axios.get(`/calendar/${volunteerId}`);
      setAvailability(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      setAvailability([]);
    }
  };

  const handleAssignClick = (report) => {
    setSelectedReport(report);
    setSelectedVolunteerId("");
    setSelectedAvailability("");
    setAvailability([]);
    setShowModal(true);
  };

  const handleVolunteerChange = async (volunteerId) => {
    setSelectedVolunteerId(volunteerId);
    setSelectedAvailability("");
    if (volunteerId) {
      await fetchAvailability(volunteerId);
    }
  };

  const handleAssignTask = async () => {
    if (!selectedReport || !selectedVolunteerId || !selectedAvailability) {
      alert("Please select a volunteer and availability.");
      return;
    }

    const volunteer = volunteers.find((v) => v.id === parseInt(selectedVolunteerId));
    const assignData = {
      reportId: selectedReport.id,
      volunteerId: volunteer.id,
      volunteerName: volunteer.name,
      volunteerContact: volunteer.phone,
      availability: selectedAvailability,
    };

    try {
      await axios.post("/api/ngo-tasks/assign-task", assignData);

      // Remove the assigned report from the UI
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== selectedReport.id)
      );

      alert("Task assigned successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task.");
    }
  };

  return (
    <>
      <NgoNavbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">NGO Reports & Volunteer Assignment</h2>

        {reports.length === 0 ? (
          <p className="text-center">No reports available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Case Type</th>
                  <th>Location</th>
                  <th>Pincode</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.description}</td>
                    <td>{report.caseType}</td>
                    <td>
                      {report.cityTownVillage}, {report.district}, {report.state}
                    </td>
                    <td>{report.pincode}</td>
                    <td>
                      {report.cameraImage ? (
                        <img
                          src={`data:image/jpeg;base64,${report.cameraImage}`}
                          alt="Report"
                          className="img-thumbnail"
                          style={{ width: "80px", height: "80px" }}
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => handleAssignClick(report)}>
                        Assign Volunteer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Volunteer to Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedReport && (
            <>
              <p><strong>Report ID:</strong> {selectedReport.id}</p>
              <p><strong>Description:</strong> {selectedReport.description}</p>
              <p><strong>Location:</strong> {selectedReport.cityTownVillage}, {selectedReport.district}</p>

              <div className="mb-3">
                <label className="form-label">Select Volunteer:</label>
                <select
                  className="form-select"
                  value={selectedVolunteerId}
                  onChange={(e) => handleVolunteerChange(e.target.value)}
                >
                  <option value="">-- Select a Volunteer --</option>
                  {volunteers.map((vol) => (
                    <option key={vol.id} value={vol.id}>
                      {vol.name} ({vol.phone})
                    </option>
                  ))}
                </select>
              </div>

              {availability.length > 0 && (
                <>
                  <hr />
                  <h6>📅 Available Slots for {volunteers.find((v) => v.id === parseInt(selectedVolunteerId))?.name}</h6>
                  <div className="mb-3">
                    {availability.map((slot) => (
                      <div className="form-check" key={slot.id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="availabilitySlot"
                          value={slot.start}
                          id={`slot-${slot.id}`}
                          onChange={(e) => setSelectedAvailability(e.target.value)}
                          checked={selectedAvailability === slot.start}
                        />
                        <label className="form-check-label" htmlFor={`slot-${slot.id}`}>
                          {new Date(slot.start).toLocaleString([], {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </label>
                      </div>
                    ))}
                  </div>
                  {selectedAvailability && (
                    <p>
                      <strong>Selected Slot:</strong>{" "}
                      {new Date(selectedAvailability).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAssignTask}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NgoReports;
