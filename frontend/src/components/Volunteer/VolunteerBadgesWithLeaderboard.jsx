import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Table, Dropdown } from 'react-bootstrap';

const VolunteerBadgesWithLeaderboard = () => {
  const user = useSelector((store) => store.auth.user);
  const [badges, setBadges] = useState([]);
  const [allBadges, setAllBadges] = useState([]);
  const [filterType, setFilterType] = useState('All');

  const fetchUserBadges = async () => {
    try {
      const res = await axios.get(`/badges/${user.userId}`);
      setBadges(res.data);
    } catch (error) {
      console.error("Error fetching user badges", error);
    }
  };

  const fetchAllBadges = async () => {
    try {
      const res = await axios.get(`/badges/all`);
      setAllBadges(res.data);
    } catch (error) {
      console.error("Error fetching all badges", error);
    }
  };

  useEffect(() => {
    fetchUserBadges();
    fetchAllBadges();
  }, []);

  const getBadgeStyles = (type) => {
    switch (type.toLowerCase()) {
      case 'gold':
        return { border: 'border-warning', text: 'text-warning', emoji: '🥇' };
      case 'silver':
        return { border: 'border-secondary', text: 'text-secondary', emoji: '🥈' };
      case 'bronze':
        return { border: 'border-danger', text: 'text-danger', emoji: '🥉' };
      default:
        return { border: 'border-dark', text: 'text-dark', emoji: '🏅' };
    }
  };

  const filteredBadges = filterType === 'All'
    ? allBadges
    : allBadges.filter(b => b.badgeType.toLowerCase() === filterType.toLowerCase());

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">🏅 Your Achievement Badges</h2>
      <div className="row">
        {badges.length === 0 ? (
          <p className="text-center">No badges earned yet.</p>
        ) : (
          badges.map((badge) => {
            const { border, text, emoji } = getBadgeStyles(badge.badgeType);
            return (
              <div className="col-md-4 mb-4" key={badge.id}>
                <div className={`card shadow ${border} h-100`}>
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="display-4 mb-3">{emoji}</div>
                    <h5 className={`card-title ${text}`}>
                      {badge.badgeType} Badge
                    </h5>
                    <p className="card-text text-center">
                      You've completed <strong>{badge.streakCount}</strong> volunteer tasks in a row!
                    </p>
                  </div>
                  <div className="card-footer text-muted text-center">
                    Badge ID: {badge.id}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Leaderboard Section */}
      <hr className="my-5" />
      <h2 className="text-center mb-3">🌟 Volunteer Leaderboard</h2>

      <div className="d-flex justify-content-end mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary">
            Filter by Badge: {filterType}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {['All', 'Bronze', 'Silver', 'Gold'].map(type => (
              <Dropdown.Item key={type} onClick={() => setFilterType(type)}>
                {type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Volunteer ID</th>
            <th>Badge Type</th>
            <th>Streak Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredBadges.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No badge data available.</td>
            </tr>
          ) : (
            filteredBadges.map((badge) => {
              const { emoji, text } = getBadgeStyles(badge.badgeType);
              return (
                <tr key={badge.id}>
                  <td>{badge.volunteerId}</td>
                  <td className={text}>{emoji} {badge.badgeType}</td>
                  <td>{badge.streakCount}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default VolunteerBadgesWithLeaderboard;
