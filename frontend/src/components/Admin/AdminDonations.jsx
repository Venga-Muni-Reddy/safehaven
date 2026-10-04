import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Footer from "../Footer";

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [show, setShow] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (donation) => {
    setSelectedDonation(donation);
    setShow(true);
  };

  useEffect(() => {
    axios
      .get("/api/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.error(err));
  }, []);

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div
      className="page-wrapper"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div className="d-flex flex-grow-1">
        <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        <div
          className="content-wrapper flex-grow-1"
          style={{
            marginLeft: isCollapsed ? "80px" : "240px",
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          <AdminNavbar />

          <div className="container mt-4 mb-5">
            <h3 className="text-center mb-4">🧾 Admin Donation Dashboard</h3>

            <div className="alert alert-success text-center fw-bold fs-5">
              💰 Total Donations Received: ₹{totalAmount.toLocaleString()}
            </div>

            <div className="accordion" id="donationAccordion">
              {donations.map((donation, index) => (
                <div className="accordion-item" key={donation.id}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index}`}
                    >
                      {donation.donorName} donated ₹{donation.amount} via{" "}
                      {donation.paymentMethod}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#donationAccordion"
                  >
                    <div className="accordion-body">
                      <p>
                        <strong>Email:</strong> {donation.email}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(donation.donationDate).toLocaleString()}
                      </p>
                      <Button variant="primary" onClick={() => handleShow(donation)}>
                        View Full Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Donation Details */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Donation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDonation && (
            <div>
              <p>
                <strong>Donor Name:</strong> {selectedDonation.donorName}
              </p>
              <p>
                <strong>Email:</strong> {selectedDonation.email}
              </p>
              <p>
                <strong>Amount:</strong> ₹{selectedDonation.amount}
              </p>
              <p>
                <strong>Payment Method:</strong> {selectedDonation.paymentMethod}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedDonation.donationDate).toLocaleString()}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default AdminDonations;
