import React from 'react';
import { FaPaw, FaHeart, FaCommentDots } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="paw-dashboard__content">
      <div className="paw-dashboard__welcome">
        <h1 className="paw-dashboard__welcome-title">Welcome back, Alex! 👋</h1>
        <p className="paw-dashboard__welcome-subtitle">
          Here is what's happening with your pets and adoption requests today. Ready to make a furry friend's day?
        </p>
      </div>

      <div className="paw-dashboard__stats">
        <div className="paw-dashboard__stat-card">
          <div className="paw-dashboard__stat-icon">
            <FaPaw />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>Total Pets Listed</h4>
            <p>3</p>
          </div>
        </div>

        <div className="paw-dashboard__stat-card">
          <div className="paw-dashboard__stat-icon">
            <FaHeart />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>Adoption Requests</h4>
            <p>12</p>
          </div>
        </div>

        <div className="paw-dashboard__stat-card">
          <div className="paw-dashboard__stat-icon">
            <FaCommentDots />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>New Messages</h4>
            <p>5</p>
          </div>
        </div>
      </div>
    </div>
  );
}