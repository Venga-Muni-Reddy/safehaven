import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerNavbar from "./VolunteerNavbar";

const VolunteerAssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Pending");

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/ngo-tasks/tasks?status=${statusFilter}`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`/api/ngo-tasks/update-status?taskId=${taskId}&status=${newStatus}`);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <>
    <VolunteerNavbar />
    <div className="container mt-4">
      <h2 className="mb-4">NGO Assigned Tasks</h2>

      <div className="mb-3">
        <label className="form-label">Filter by Status:</label>
        <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Report ID</th>
            <th>Volunteer</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.reportCase.id}</td>
              <td>{task.volunteerName}</td>
              <td>{task.volunteerContact}</td>
              <td>{task.status}</td>
              <td>
                {task.status !== "Completed" && (
                  <button className="btn btn-success me-2" onClick={() => updateTaskStatus(task.id, "Completed")}>
                    Mark as Completed
                  </button>
                )}
                {task.status !== "InProgress" && task.status !== "Completed" && (
                  <button className="btn btn-warning" onClick={() => updateTaskStatus(task.id, "InProgress")}>
                    Mark as In Progress
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default VolunteerAssignedTasks;
