import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import VolunteerNavbar from './VolunteerNavbar';

const VolunteerBadges = () => {
  const user = useSelector((store) => store.auth.user);
  const [badges, setBadges] = useState([]);

  const fetchBadge = async () => {
    try {
      const res = await axios.get(`/badges/${user.userId}`);
      setBadges(res.data);
    } catch (error) {
      console.error("Error fetching badges", error);
    }
  };

  useEffect(() => {
    fetchBadge();
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

  return (
    <>
    <VolunteerNavbar />
    <div className="container mt-5">
      <h2 className="text-center mb-4">🏅 Volunteer Achievement Badges</h2>
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
    </div>
    </>
  );
};

export default VolunteerBadges;
