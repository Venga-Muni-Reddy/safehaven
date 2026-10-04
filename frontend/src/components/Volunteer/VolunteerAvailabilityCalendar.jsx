// Same imports...
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import VolunteerNavbar from './VolunteerNavbar';

function VolunteerAvailabilityCalendar() {
  const [date, setDate] = useState(new Date());
  const [availability, setAvailability] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editSlotId, setEditSlotId] = useState(null); // For editing
  const volunteerId = useSelector((store) => store.auth?.user?.userId);
  console.log(volunteerId)
  useEffect(() => {
    if (volunteerId) {
      axios
        .get(`/calendar/${volunteerId}`)
        .then((res) => setAvailability(res.data))
        .catch((err) => console.error(err));
    }
  }, [volunteerId]);
  console.log(availability)

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setStartTime('');
    setEndTime('');
    setEditSlotId(null);
  };

  const handleSubmitAvailability = () => {
    const selectedDate = date.toISOString().split('T')[0];
    const start = new Date(`${selectedDate}T${startTime}`);
    const end = new Date(`${selectedDate}T${endTime}`);

    if (!startTime || !endTime || start >= end) {
      alert('Please enter a valid time slot.');
      return;
    }

    const payload = {
      title: 'Available',
      description: 'Volunteer available',
      start,
      end,
      volunteerId,
    };

    if (editSlotId) {
      // Update
      axios
        .put(`/calendar/${editSlotId}`, payload)
        .then((res) => {
          setAvailability((prev) =>
            prev.map((slot) => (slot.id === editSlotId ? res.data : slot))
          );
          resetForm();
          alert('Availability updated!');
        })
        .catch((err) => console.error('Error updating availability:', err));
    } else {
      // Create
      axios
        .post('/calendar', payload)
        .then((res) => {
          setAvailability((prev) => [...prev, res.data]);
          resetForm();
          alert('Availability submitted!');
        })
        .catch((err) => console.error('Error submitting availability:', err));
    }
  };

  const handleEdit = (slot) => {
    const start = new Date(slot.start);
    const end = new Date(slot.end);
    setEditSlotId(slot.id);
    setDate(start);
    setStartTime(start.toTimeString().slice(0, 5));
    setEndTime(end.toTimeString().slice(0, 5));
  };

  const handleDelete = (id) => {
    axios.delete(`/calendar/${id}`).then(() => {
      setAvailability((prev) => prev.filter((slot) => slot.id !== id));
      if (editSlotId === id) resetForm();
    });
  };

  const resetForm = () => {
    setStartTime('');
    setEndTime('');
    setEditSlotId(null);
  };

  const filteredSlots = availability.filter(
    (slot) => new Date(slot.start).toDateString() === date.toDateString()
  );

  return (
    <>
    <VolunteerNavbar />
    <div className="container mt-4">
      <h3>📅 Mark Your Availability</h3>
      <div className="row">
        <div className="col-md-6">
          <Calendar onChange={handleDateChange} value={date} className="border rounded" />
          <p className="mt-2">Selected Date: <strong>{date.toDateString()}</strong></p>
        </div>

        <div className="col-md-6">
          <div className="form-group mb-2">
            <label>Start Time</label>
            <input
              type="time"
              className="form-control"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="form-group mb-2">
            <label>End Time</label>
            <input
              type="time"
              className="form-control"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <button className="btn btn-primary me-2" onClick={handleSubmitAvailability}>
            {editSlotId ? 'Update Availability' : 'Save Availability'}
          </button>
          {editSlotId && (
            <button className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h5>🟢 Availability on {date.toDateString()}:</h5>
        {filteredSlots.length > 0 ? (
          <ul className="list-group">
            {filteredSlots.map((slot) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={slot.id}>
                <span>
                  🕒{' '}
                  {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                  {new Date(slot.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(slot)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(slot.id)}>
                    ❌ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No availability marked for this date.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default VolunteerAvailabilityCalendar;
