import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PublicNavbar from '../../pages/PublicNavbar';
import Footer from '../Footer';

const ViewSuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    axios
      .get('/api/success-stories')
      .then((response) => setStories(response.data))
      .catch((error) => console.error('Error fetching success stories:', error));
  }, []);

  return (
<>
  <PublicNavbar />

  <div className="d-flex flex-column min-vh-100">
    <div className="bg-primary-subtle py-5 flex-grow-1">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-primary">🌟 Success Stories 🌟</h2>

        {stories.length === 0 ? (
          <p className="text-center text-muted">No success stories available yet.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {stories.map((story, index) => (
              <div className="col" key={story.id}>
                <div
                  className={`card h-100 shadow border-0 ${
                    index % 2 === 0 ? 'bg-light' : 'bg-info-subtle'
                  }`}
                  data-bs-toggle="modal"
                  data-bs-target="#storyModal"
                  onClick={() => setSelectedStory(story)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={story.imageUrl}
                    className="card-img-top"
                    alt={story.title}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary">{story.title}</h5>
                    <p className="card-text text-muted">
                      {story.description.length > 100
                        ? story.description.substring(0, 100) + '...'
                        : story.description}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-end">
                    <button className="btn btn-outline-primary btn-sm">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Modal remains unchanged */}
    <div
      className="modal fade"
      id="storyModal"
      tabIndex="-1"
      aria-labelledby="storyModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" id="storyModalLabel">
              {selectedStory?.title}
            </h5>
            <button
              type="button"
              className="btn-close bg-light"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <img
              src={selectedStory?.imageUrl}
              alt="Story"
              className="img-fluid mb-3 rounded"
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
            <p className="text-dark fs-5 lh-lg">{selectedStory?.description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</>

  );
};

export default ViewSuccessStories;
