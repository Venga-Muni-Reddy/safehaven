import React, { useState } from "react";

const SuccessStoriesSection = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    {
      id: 1,
      name: "Puneeth Rajkumar - The King of Hearts ❤️",
      image:
        "https://i.pinimg.com/736x/5d/a4/10/5da41007e4a78105998b649473550b19.jpg",
      description: `Puneeth Rajkumar, fondly known as "Appu," was not just a superstar of Kannada cinema but also a true humanitarian. He donated millions to orphanages, funded education for thousands of underprivileged students, and contributed immensely to social causes. Even after his passing, his eyes were donated, giving sight to four people. His legacy continues to inspire millions.`,
      link: "https://en.wikipedia.org/wiki/Puneeth_Rajkumar",
    },
    {
      id: 2,
      name: "Sonu Sood - The Real-life Hero 💙",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9i0Ij6Ng99_0sRIjH7Kb6E41I6iQyyVNuaw&s",
      description: `Sonu Sood emerged as a "Messiah" during the COVID-19 pandemic. While governments struggled, he arranged buses, trains, and even flights for stranded migrant workers. He provided medical aid, job opportunities, and educational scholarships to thousands. His relentless efforts transformed lives, proving that true heroes exist beyond the silver screen.`,
      link: "https://www.soodcharityfoundation.org/",
    },
    {
      id: 3,
      name: "Gattu Giri - The Green Warrior 🌱",
      image:
        "https://dkprodimages.gumlet.io/campaignupdates/3381/WhatsApp%20Image%202021-11-17%20at%204.56.47%20PM%20(2).jpeg?format=webp&w=400&dpr=2.6",
      description: `Gattu Giri, an environmentalist from India, dedicated his life to reforestation. He planted over 1 million trees, restoring ecosystems, reducing pollution, and inspiring youth to take climate action. His mission is to create a greener, healthier world, proving that a single person can bring massive change.`,
      link: "#",
    },
  ];

  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center fw-bold mb-5 text-warning">
          🌟 Inspiring Success Stories 🌟
        </h2>
        <div className="row g-4">
          {stories.map((story) => (
            <div className="col-md-4" key={story.id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={story.image}
                  className="card-img-top"
                  alt={story.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-success">{story.name}</h5>
                  <p className="card-text text-dark small">
                    {story.description.slice(0, 100)}...
                  </p>
                  <button
                    className="btn btn-outline-primary mt-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#storyModal"
                    onClick={() => setSelectedStory(story)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for detailed story */}
        <div
          className="modal fade"
          id="storyModal"
          tabIndex="-1"
          aria-labelledby="storyModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              {selectedStory && (
                <>
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title" id="storyModalLabel">
                      {selectedStory.name}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <img
                      src={selectedStory.image}
                      className="img-fluid mb-3 rounded"
                      alt={selectedStory.name}
                    />
                    <p className="text-dark">{selectedStory.description}</p>
                  </div>
                  <div className="modal-footer">
                    <a
                      href={selectedStory.link}
                      className="btn btn-success"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Source
                    </a>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
