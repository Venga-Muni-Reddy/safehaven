import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Container, Dropdown } from "react-bootstrap";
import AdminSidebar from "./AdminSidebar";
import Footer from "../Footer";
import AdminNavbar from "./AdminNavbar";

const BadgeAssignment = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [badgeFilter, setBadgeFilter] = useState("All");
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar toggle state

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = () => {
    axios
      .get("/api/ngo-tasks/tasks?status=Completed")
      .then((response) => {
        const taskData = response.data;
        const volunteerMap = new Map();

        taskData.forEach((task) => {
          if (!volunteerMap.has(task.volunteerId)) {
            volunteerMap.set(task.volunteerId, {
              id: task.volunteerId,
              name: task.volunteerName,
              completedTasks: 0,
            });
          }
          volunteerMap.get(task.volunteerId).completedTasks++;
        });

        const uniqueVolunteers = [...volunteerMap.values()];

        axios
          .get("/badges/all")
          .then((badgeResponse) => {
            const badgeAssignedVolunteers = new Set(
              badgeResponse.data.map((b) => b.volunteerId)
            );

            const filteredVolunteers = uniqueVolunteers.filter(
              (vol) => !badgeAssignedVolunteers.has(vol.id)
            );

            setVolunteers(filteredVolunteers);
            setFilteredVolunteers(filteredVolunteers);
          })
          .catch((error) => console.error("Error fetching badges", error));
      })
      .catch((error) => console.error("Error fetching tasks", error));
  };

  const assignBadge = (volunteerId, badgeType) => {
    axios
      .post("/badges/assign", null, {
        params: { volunteerId, badgeType },
      })
      .then(() => {
        alert(`Assigned ${badgeType} to Volunteer ${volunteerId}`);
        setVolunteers((prev) => prev.filter((vol) => vol.id !== volunteerId));
        if (badgeFilter === "All") {
          setFilteredVolunteers((prev) =>
            prev.filter((vol) => vol.id !== volunteerId)
          );
        } else {
          filterByBadge(badgeFilter);
        }
      })
      .catch((error) => console.error("Error assigning badge", error));
  };

  const filterByBadge = (badgeType) => {
    setBadgeFilter(badgeType);

    if (badgeType === "All") {
      setFilteredVolunteers(volunteers);
    } else {
      axios
        .get(`/badges/badge/${badgeType}`)
        .then((response) => {
          const badgeData = response.data;

          axios
            .get("/api/ngo-tasks/tasks?status=Completed")
            .then((taskResponse) => {
              const taskData = taskResponse.data;
              const volunteerMap = new Map();

              taskData.forEach((task) => {
                if (!volunteerMap.has(task.volunteerId)) {
                  volunteerMap.set(task.volunteerId, {
                    id: task.volunteerId,
                    name: task.volunteerName,
                    completedTasks: 0,
                  });
                }
                volunteerMap.get(task.volunteerId).completedTasks++;
              });

              const freshVolunteers = [...volunteerMap.values()];

              const filtered = badgeData
                .map((badge) => {
                  const volunteer = freshVolunteers.find(
                    (vol) => Number(vol.id) === Number(badge.volunteerId)
                  );
                  return volunteer ? { ...volunteer, badgeType } : null;
                })
                .filter((vol) => vol !== null);

              setFilteredVolunteers(filtered);
            })
            .catch((error) =>
              console.error("Error fetching updated volunteers", error)
            );
        })
        .catch((error) => console.error("Error filtering data", error));
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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

          <Container className="mt-4 mb-5">
            <h2>Admin Panel - Assign Badges</h2>

            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="primary">
                Filter by Badge: {badgeFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => filterByBadge("All")}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => filterByBadge("Bronze")}>Bronze</Dropdown.Item>
                <Dropdown.Item onClick={() => filterByBadge("Silver")}>Silver</Dropdown.Item>
                <Dropdown.Item onClick={() => filterByBadge("Gold")}>Gold</Dropdown.Item>
                <Dropdown.Item onClick={() => filterByBadge("Streak")}>Streak</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Volunteer ID</th>
                  <th>Name</th>
                  <th>Completed Tasks</th>
                  {badgeFilter === "All" && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((vol) => (
                  <tr key={vol.id}>
                    <td>{vol.id}</td>
                    <td>{vol.name}</td>
                    <td>{vol.completedTasks}</td>
                    {badgeFilter === "All" && (
                      <td>
                        <Button
                          onClick={() => assignBadge(vol.id, "Bronze")}
                          variant="warning"
                          className="me-2"
                        >
                          Bronze
                        </Button>
                        <Button
                          onClick={() => assignBadge(vol.id, "Silver")}
                          variant="secondary"
                          className="me-2"
                        >
                          Silver
                        </Button>
                        <Button
                          onClick={() => assignBadge(vol.id, "Gold")}
                          variant="success"
                        >
                          Gold
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BadgeAssignment;
