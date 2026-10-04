// src/components/Profile.js
import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";

const Profile = ({ show, handleClose }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="bi bi-person-circle me-2"></i> My Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Username</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Role</th>
                <td className="text-capitalize">{user.role}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-danger">No user information found.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="bi bi-x-circle me-2"></i> Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
