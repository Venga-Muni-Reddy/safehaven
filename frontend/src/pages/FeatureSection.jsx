import React from "react";

const FeaturesSection = () => {
  return (
    <section className="features-section py-5">
      <div className="container text-center">
        <h2 className="mb-4">Our Key Features</h2>
        <div className="row">
          <div className="col-md-4">
            <i className="bi bi-geo-alt-fill feature-icon"></i>
            <h4>Report Cases</h4>
            <p>Help us identify those in need by reporting cases with ease.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-heart-fill feature-icon"></i>
            <h4>Make Donations</h4>
            <p>Contribute funds or resources to bring change in hearts of humans.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-bookmark-check-fill feature-icon"></i>
            <h4>View Stories</h4>
            <p>Be inspired by success stories and progress updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
