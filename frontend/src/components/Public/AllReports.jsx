import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminNavbar from "../Admin/AdminNavbar";
import AdminSidebar from "../Admin/AdminSidebar";
import Footer from "../Footer";

const PAGE_SIZE = 1;

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [publicPage, setPublicPage] = useState(0);
  const [hasMorePublic, setHasMorePublic] = useState(true);

  const [completedReports, setCompletedReports] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [completedPage, setCompletedPage] = useState(0);
  const [pendingPage, setPendingPage] = useState(0);
  const [hasMoreCompleted, setHasMoreCompleted] = useState(true);
  const [hasMorePending, setHasMorePending] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const hasFetched = useRef(false);

  const fetchCompletedReports = async () => {
    try {
      const response = await axios.get(
        `/api/ngo-tasks/tasks?status=Completed&page=${completedPage}&size=${PAGE_SIZE}`
      );
      const newTasks = response.data;
      const processedReports = newTasks.map((task) => ({
        ...task.reportCase,
        status: "Completed",
        volunteerName: task.volunteerName,
        volunteerContact: task.volunteerContact,
        ngoName: "Helping Hands",
        assignedAt: task.assignedAt,
        completedAt: task.completedAt,
      }));
      setCompletedReports((prev) => [...prev, ...processedReports]);
      setHasMoreCompleted(newTasks.length === PAGE_SIZE);
      setCompletedPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to fetch completed reports:", err);
      setError("Failed to fetch completed reports.");
      setHasMoreCompleted(false);
    }
  };

  const fetchPendingReports = async () => {
    try {
      const response = await axios.get(
        `/api/reports/unassigned?page=${pendingPage}&size=${PAGE_SIZE}`
      );
      const newReports = response.data;
      setPendingReports((prev) => [...prev, ...newReports]);
      setHasMorePending(newReports.length === PAGE_SIZE);
      setPendingPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to fetch pending reports:", err);
      setError("Failed to fetch pending reports.");
      setHasMorePending(false);
    }
  };

  const fetchPublicReports = async () => {
    try {
      const response = await axios.get(
        `/api/reports/public?page=${publicPage}&size=${PAGE_SIZE}`
      );
      const newReports = response.data;
      setReports((prev) => [...prev, ...newReports]);
      setHasMorePublic(newReports.length === PAGE_SIZE);
      setPublicPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to fetch public reports:", err);
      setError("Failed to fetch public reports.");
      setHasMorePublic(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    setLoading(true);
    if (user && user.role === "Admin") {
      Promise.all([fetchCompletedReports(), fetchPendingReports()]).finally(() => {
        setLoading(false);
      });
    } else {
      fetchPublicReports().finally(() => {
        setLoading(false);
      });
    }
    hasFetched.current = true;
  }, [user]);

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-4">{error}</div>;

  const cardClasses = [
    { card: "bg-info-subtle", header: "bg-info text-white" },
    { card: "bg-warning-subtle", header: "bg-warning text-white" },
    { card: "bg-success-subtle", header: "bg-success text-white" },
  ];

  const mainContentMargin = user && user.role === "Admin" && isCollapsed ? "80px" : "240px";
  const allReportsForColor = [...completedReports, ...pendingReports];

  const renderAdminView = () => (
    <>
      <AdminNavbar />
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className="flex-grow-1"
        style={{
          marginLeft: mainContentMargin,
          transition: "margin-left 0.3s ease-in-out",
          background: "linear-gradient(135deg, #e0eafc, #c3cfe2)",
        }}
      >
        <div className="py-5">
          <div className="container-fluid">
            <h2 className="text-center text-primary-emphasis fw-bold mb-5">
              <i className="bi bi-clipboard-check me-2"></i> All Reported Cases
            </h2>

            {allReportsForColor.length === 0 && !hasMoreCompleted && !hasMorePending && (
              <p className="text-center text-muted">No reports found.</p>
            )}

            {/* Completed Reports */}
            {completedReports.length > 0 && (
              <>
                <h3 className="text-start text-success fw-bold mb-4">Completed Reports</h3>
                <InfiniteScroll
                  dataLength={completedReports.length}
                  next={fetchCompletedReports}
                  hasMore={hasMoreCompleted}
                  loader={<h4 className="text-center text-muted my-3">Loading more completed reports...</h4>}
                  endMessage={<p className="text-center text-muted"><b>End of completed reports.</b></p>}
                >
                  <div className="row g-4 mb-5">
                    {completedReports.map((report, index) => {
                      const colorScheme = cardClasses[index % cardClasses.length];
                      return (
                        <div className="col-md-6 col-lg-4" key={report.id}>
                          <div className={`card shadow h-100 border-0 rounded-4 overflow-hidden ${colorScheme.card}`}>
                            <div className={`card-header ${colorScheme.header} py-3 d-flex justify-content-between align-items-center`}>
                              <h5 className="card-title mb-0 fw-bold">Case #{report.id}</h5>
                              <span className="badge bg-success rounded-pill p-2">Completed</span>
                            </div>
                            <div className="card-body p-4">
                              <p className="small text-muted mb-1"><strong>Description:</strong></p>
                              <p className="card-text mb-3">{report.description}</p>
                              <ul className="list-unstyled small mt-3">
                                <li><strong>Assigned by NGO:</strong> {report.ngoName}</li>
                                <li><strong>Volunteer:</strong> {report.volunteerName} ({report.volunteerContact})</li>
                                <li><strong>Completed At:</strong> {new Date(report.completedAt).toLocaleString()}</li>
                              </ul>
                              <hr />
                              <p className="mb-2"><i className="bi bi-tag-fill me-2 text-primary"></i> <strong className="text-secondary-emphasis">Type:</strong> <span className="badge bg-dark rounded-pill">{report.caseType}</span></p>
                              <p className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-success"></i> <strong className="text-secondary-emphasis">Location:</strong> <span className="badge bg-secondary-subtle text-secondary">{report.state}</span>, <span className="badge bg-light text-dark">{report.district}</span>, {report.cityTownVillage}</p>
                              <div className="text-center mt-4">
                                {report.cameraImageBase64 ? (
                                  <div className="overflow-hidden rounded-3 border border-dark border-2">
                                    <img src={`data:image/jpeg;base64,${report.cameraImageBase64}`} alt="Report" className="img-fluid rounded-3" style={{ maxHeight: "150px", objectFit: "cover" }} />
                                  </div>
                                ) : (
                                  <span className="badge bg-danger p-2">No Image Available</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </>
            )}

            {/* Pending Reports */}
            {pendingReports.length > 0 && (
              <>
                <h3 className="text-start text-warning fw-bold mb-4">Pending Reports</h3>
                <InfiniteScroll
                  dataLength={pendingReports.length}
                  next={fetchPendingReports}
                  hasMore={hasMorePending}
                  loader={<h4 className="text-center text-muted my-3">Loading more pending reports...</h4>}
                  endMessage={<p className="text-center text-muted"><b>End of pending reports.</b></p>}
                >
                  <div className="row g-4">
                    {pendingReports.map((report, index) => {
                      const colorScheme = cardClasses[(index + completedReports.length) % cardClasses.length];
                      return (
                        <div className="col-md-6 col-lg-4" key={report.id}>
                          <div className={`card shadow h-100 border-0 rounded-4 overflow-hidden ${colorScheme.card}`}>
                            <div className={`card-header ${colorScheme.header} py-3 d-flex justify-content-between align-items-center`}>
                              <h5 className="card-title mb-0 fw-bold">Case #{report.id}</h5>
                              <span className="badge bg-warning rounded-pill p-2">Pending</span>
                            </div>
                            <div className="card-body p-4">
                              <p className="small text-muted mb-1"><strong>Description:</strong></p>
                              <p className="card-text mb-3">{report.description}</p>
                              <p className="mb-2"><i className="bi bi-tag-fill me-2 text-primary"></i> <strong className="text-secondary-emphasis">Type:</strong> <span className="badge bg-dark rounded-pill">{report.caseType}</span></p>
                              <p className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-success"></i> <strong className="text-secondary-emphasis">Location:</strong> <span className="badge bg-secondary-subtle text-secondary">{report.state}</span>, <span className="badge bg-light text-dark">{report.district}</span>, {report.cityTownVillage}</p>
                              <div className="text-center mt-4">
                                {report.cameraImage ? (
                                  <div className="overflow-hidden rounded-3 border border-dark border-2">
                                    <img src={`data:image/jpeg;base64,${report.cameraImage}`} alt="Report" className="img-fluid rounded-3" style={{ maxHeight: "150px", objectFit: "cover" }} />
                                  </div>
                                ) : (
                                  <span className="badge bg-danger p-2">No Image Available</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  const renderPublicView = () => {
    const completedPublicReports = reports.filter((r) => r.status === "Completed");
    const notCompletedPublicReports = reports.filter((r) => r.status !== "Completed");

    const renderReportCard = (report, index, status) => {
      const colorScheme = cardClasses[index % cardClasses.length];
      return (
        <div className="col-md-6 col-lg-4" key={report.id || index}>
          <div className={`card h-100 shadow rounded-4 border-0 ${colorScheme.card}`}>
            <div className={`card-header d-flex justify-content-between align-items-center px-4 py-3 rounded-top ${colorScheme.header}`}>
              <h5 className="mb-0 fw-bold text-white">Case #{report.id}</h5>
              <span className={`badge ${status === "Completed" ? "bg-success" : "bg-warning"} rounded-pill p-2`}>
                {status}
              </span>
            </div>
            <div className="card-body p-4">
              <p className="text-muted small"><strong>Description:</strong></p>
              <p className="card-text mb-3">{report.description}</p>
              <p className="mb-2"><i className="bi bi-tag-fill me-2 text-primary"></i> <strong className="text-secondary-emphasis">Type:</strong> <span className="badge bg-dark rounded-pill">{report.caseType}</span></p>
              <p className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-success"></i> <strong className="text-secondary-emphasis">Location:</strong> {report.cityTownVillage}, {report.district}</p>
              <div className="text-center mt-4">
                {report.cameraImage ? (
                  <img src={`data:image/jpeg;base64,${report.cameraImage}`} alt="Report" className="img-fluid rounded-3 border border-dark" style={{ maxHeight: "150px", objectFit: "cover" }} />
                ) : (
                  <span className="badge bg-danger p-2">No Image Available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        <div className="flex-grow-1" style={{ background: "linear-gradient(135deg, #e0eafc, #c3cfe2)" }}>
          <div className="py-5">
            <div className="container">
              <h2 className="text-center text-primary-emphasis fw-bold mb-5">
                <i className="bi bi-megaphone me-2"></i> Community Reports
              </h2>

              {reports.length === 0 && !hasMorePublic && (
                <p className="text-center text-muted">No public reports available at the moment.</p>
              )}

              <InfiniteScroll
                dataLength={reports.length}
                next={fetchPublicReports}
                hasMore={hasMorePublic}
                loader={<div className="text-center py-4"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>}
                endMessage={<p className="text-center text-muted py-4"><b>You have seen all the reports!</b></p>}
              >
                {completedPublicReports.length > 0 && (
                  <>
                    <h3 className="text-start text-success fw-bold mb-4"><i className="bi bi-check-circle-fill me-2"></i>Completed Reports</h3>
                    <div className="row g-4 mb-5">
                      {completedPublicReports.map((report, index) =>
                        renderReportCard(report, index, "Completed")
                      )}
                    </div>
                  </>
                )}
                {notCompletedPublicReports.length > 0 && (
                  <>
                    <h3 className="text-start text-warning fw-bold mb-4"><i className="bi bi-hourglass-split me-2"></i>Ongoing / Pending Reports</h3>
                    <div className="row g-4">
                      {notCompletedPublicReports.map((report, index) =>
                        renderReportCard(report, index + completedPublicReports.length, "Pending")
                      )}
                    </div>
                  </>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {user && user.role === "Admin" ? renderAdminView() : renderPublicView()}
    </div>
  );
};

export default AllReports;
