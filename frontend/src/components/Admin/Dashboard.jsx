import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import Footer from "../Footer";

const AdminDashboard = () => {
  const [ngos, setNgos] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const admin = useSelector((state) => state.auth.user);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = () => {
    axios.get("/admin/pending-users")
      .then((response) => {
        const ngoUsers = response.data.filter((user) => user.role === "NGO");
        const volunteerUsers = response.data.filter((user) => user.role === "Volunteer");
        setNgos(ngoUsers);
        setVolunteers(volunteerUsers);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleApprove = (id) => {
    axios.put(`/admin/approve/${id}`)
      .then((response) => {
        toast.success(response.data);
        fetchPendingUsers();
      })
      .catch((error) => {
        toast.error("Error approving user");
        console.error("Error approving user:", error);
      });
  };

  const handleReject = (id) => {
    axios.put(`/admin/reject/${id}`)
      .then((response) => {
        toast.info(response.data);
        fetchPendingUsers();
      })
      .catch((error) => {
        toast.error("Error rejecting user");
        console.error("Error rejecting user:", error);
      });
  };

  return (
    <div className="d-flex flex-column vh-100">
      <AdminNavbar />

      <div className="d-flex flex-grow-1">
        <AdminSidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />

        <div className="p-3 flex-grow-1 position-relative"
          style={{
            marginLeft: isSidebarCollapsed ? "80px" : "240px",
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          {/* 3D Background Element */}
          <div className="position-absolute top-0 start-0 w-100 h-50" style={{ zIndex: 0 }}>
            <Canvas>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Sphere args={[1, 32, 32]}>
                <MeshDistortMaterial
                  color="#4a90e2"
                  distort={0.4}
                  speed={2}
                />
              </Sphere>
            </Canvas>
          </div>

          {/* Main Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-light shadow rounded text-center p-4 mb-4"
            >
              <h2 className="fw-bold text-gradient-primary">Welcome, {admin?.name || "Admin"}! 👨💼</h2>
              <p className="text-muted">Manage community contributions with precision</p>
              
              {/* Stats Cards */}
              <div className="row mt-4">
                <div className="col-md-4">
                  <motion.div 
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="card-body">
                      <h3 className="text-primary">{ngos.length}</h3>
                      <p>Pending NGOs</p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="col-md-4">
                  <motion.div 
                    className="card h-100 shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="card-body">
                      <h3 className="text-success">{volunteers.length}</h3>
                      <p>Pending Volunteers</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Approval Sections */}
            <AnimatePresence>
              {/* NGO Approvals */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-5"
              >
                <h2 className="text-primary mb-4">⛑️ NGO Approvals</h2>
                <div className="row g-4">
                  {ngos.length > 0 ? (
                    ngos.map((user) => (
                      <motion.div
                        key={user.id}
                        className="col-md-4"
                        variants={cardVariants}
                      >
                        <motion.div
                          className="card h-100 shadow-sm"
                          whileHover={{ y: -5 }}
                        >
                          <div className="card-body">
                            <h5 className="fw-bold">{user.name}</h5>
                            <p className="text-muted mb-2">{user.email}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className={`badge rounded-pill bg-${user.status === 'Pending' ? 'warning' : 'success'}`}>
                                {user.status}
                              </span>
                              {user.status === "Pending" && (
                                <div className="d-flex gap-2">
                                  <motion.button
                                    className="btn btn-success btn-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleApprove(user.id)}
                                  >
                                    Approve
                                  </motion.button>
                                  <motion.button
                                    className="btn btn-danger btn-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleReject(user.id)}
                                  >
                                    Reject
                                  </motion.button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p className="text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      All NGOs approved! 🎉
                    </motion.p>
                  )}
                </div>
              </motion.div>

              {/* Volunteer Approvals */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-5"
              >
                <h2 className="text-primary mb-4">🙋 Volunteer Approvals</h2>
                <div className="row g-4">
                  {volunteers.length > 0 ? (
                    volunteers.map((user) => (
                      <motion.div
                        key={user.id}
                        className="col-md-4"
                        variants={cardVariants}
                      >
                        <motion.div
                          className="card h-100 shadow-sm"
                          whileHover={{ y: -5 }}
                        >
                          <div className="card-body">
                            <h5 className="fw-bold">{user.name}</h5>
                            <p className="text-muted mb-2">{user.email}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className={`badge rounded-pill bg-${user.status === 'Pending' ? 'warning' : 'success'}`}>
                                {user.status}
                              </span>
                              {user.status === "Pending" && (
                                <div className="d-flex gap-2">
                                  <motion.button
                                    className="btn btn-success btn-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleApprove(user.id)}
                                  >
                                    Approve
                                  </motion.button>
                                  <motion.button
                                    className="btn btn-danger btn-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleReject(user.id)}
                                  >
                                    Reject
                                  </motion.button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p className="text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      All Volunteers approved! 🎉
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar
        toastStyle={{
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#1a1a1a',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      />
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
