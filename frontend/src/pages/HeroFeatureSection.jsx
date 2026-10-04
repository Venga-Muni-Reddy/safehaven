import React from "react";

const HeroFeaturesSection = () => {
  return (
    <section
      className="hero-section text-center text-white d-flex align-items-center"
      style={{
        background: "linear-gradient(to right, #4b6cb7, #182848)", // Updated to a cooler gradient
        minHeight: "100vh",
        padding: "80px 0",
      }}
    >
      <div className="container">
        {/* Hero Content */}
        <div className="mb-5">
          <h1
            className="display-8 fw-bold"
            style={{
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textShadow: "2px 2px 10px rgba(255,255,255,0.2)",
            }}
          >
            Together, We Can Build a Better Future
          </h1>
          <p
            className="lead"
            style={{
              fontSize: "1.3rem",
              fontWeight: "lighter",
              fontStyle: "italic",
              opacity: 0.9,
            }}
          >
            Join us in making a difference for those in need.
          </p>
        </div>

        {/* Features Section */}
        <div className="row text-dark">
          {/* Report Cases Card */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow p-4 text-center feature-card"
              style={{
                background: "linear-gradient(to bottom, #ff9a9e, #fad0c4)",
                borderRadius: "15px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(255, 154, 158, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 3px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <i className="bi bi-geo-alt-fill display-4 text-primary"></i>
              <h4 className="mt-3" style={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                Report Cases
              </h4>
              <p style={{ fontSize: "1.1rem" }}>Help us identify those in need by reporting cases with ease.</p>
            </div>
          </div>

          {/* Make Donations Card */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow p-4 text-center feature-card"
              style={{
                background: "linear-gradient(to bottom, #ff758c, #ff7eb3)",
                borderRadius: "15px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(255, 117, 140, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 3px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <i className="bi bi-heart-fill display-4 text-danger"></i>
              <h4 className="mt-3" style={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                Make Donations
              </h4>
              <p style={{ fontSize: "1.1rem" }}>Contribute funds or resources to bring change in the hearts of humans.</p>
            </div>
          </div>

          {/* View Stories Card */}
          <div className="col-md-4">
            <div
              className="card border-0 shadow p-4 text-center feature-card"
              style={{
                background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
                borderRadius: "15px",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(106, 17, 203, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 3px 6px rgba(0, 0, 0, 0.1)";
              }}
            >
              <i className="bi bi-bookmark-check-fill display-4 text-success"></i>
              <h4 className="mt-3" style={{ fontWeight: "bold", fontFamily: "'Raleway', sans-serif" }}>
                View Stories
              </h4>
              <p style={{ fontSize: "1.1rem" }}>Be inspired by success stories and progress updates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFeaturesSection;
