import React, { useEffect, useState } from "react";
import axios from "axios";

function SuccessStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("/api/success-stories")
      .then(response => setStories(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="row">
      <NgoNavbar />
      {stories.map(story => (
        <div className="col-md-4 mb-4" key={story.id}>
          <div className="card shadow-sm">
            {story.imageUrl && (
              <img src={story.imageUrl} className="card-img-top" alt={story.title} />
            )}
            <div className="card-body">
              <h5 className="card-title">{story.title}</h5>
              <p className="card-text">{story.description.substring(0, 100)}...</p>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#storyModal${story.id}`}>
                Read More
              </button>
            </div>
          </div>

          {/* Modal for detailed view */}
          <div className="modal fade" id={`storyModal${story.id}`} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{story.title}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {story.imageUrl && <img src={story.imageUrl} className="img-fluid mb-3" alt={story.title} />}
                  <p>{story.description}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default SuccessStories;
