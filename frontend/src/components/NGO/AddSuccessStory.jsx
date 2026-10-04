import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NgoNavbar from "./NgoNavbar";
import Footer from "../Footer";

function AddSuccessStory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStory = { title, description, imageUrl };

    try {
      await axios.post("/api/success-stories/add", newStory);
      navigate("/ngo-home");
    } catch (error) {
      console.error("Error adding story", error);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NgoNavbar />

      {/* 🌈 Gradient Background Section with Top Margin */}
      <div
  className="flex-grow-1 d-flex justify-content-center"
  style={{
    background: "linear-gradient(135deg, #a1c4fd, #c2e9fb, #d4fc79, #96e6a1)",
    padding: "100px 20px 60px", // Top spacing added here
  }}
>

        <div className="container col-md-10 col-lg-8">
          <div
            className="card shadow-lg border-0"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(226,246,222,0.95))",
              borderRadius: "20px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="card-header bg-success text-white text-center py-3 rounded-top">
              <h4 className="mb-0 fw-bold">Share a New Success Story</h4>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter story title"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell the full story..."
                    required
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Image URL (optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste image URL here"
                  />
                </div>

                {imageUrl && (
                  <div className="mb-4 text-center">
                    <img
                      src={imageUrl}
                      alt="Story Preview"
                      className="img-fluid rounded shadow-sm"
                      style={{ maxHeight: "250px" }}
                    />
                  </div>
                )}

                <div className="d-grid">
                  <button type="submit" className="btn btn-success btn-lg">
                    Submit Story
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer text-muted text-center py-2">
              <small>Inspire change, one story at a time 🌱</small>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AddSuccessStory;
