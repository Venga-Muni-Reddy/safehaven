import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VolunteerNavbar from '../Volunteer/VolunteerNavbar';

function NGOContact() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    axios.get('/auth/ngos')
      .then(response => setNgos(response.data))
      .catch(error => console.error('Error fetching NGOs:', error));
  }, []);
  return (
    <>
    <VolunteerNavbar />
    <div className="container mt-4">
      <h2>Contact NGOs</h2>
      <div className="row">
        {ngos.map(ngo => (
          <div className="col-md-4" key={ngo.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{ngo.name}</h5>
                <p className="card-text"><strong>Email:</strong> {ngo.email}</p>
                <p className="card-text"><strong>Phone:</strong> {ngo.phone}</p>
                <p className="card-text"><strong>Address:</strong> {ngo.address}</p>
                <a href={`mailto:${ngo.email}`} className="btn btn-primary">Email NGO</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default NGOContact;
