import React from 'react';
import { FaListAlt } from 'react-icons/fa';

export default function ListingsPage() {
  return (
    <div className="paw-dashboard__content">
      <div className="paw-dashboard__welcome">
        <h1 className="paw-dashboard__welcome-title">My Listings</h1>
        <p className="paw-dashboard__welcome-subtitle">
          Manage the pets you have listed for adoption.
        </p>
      </div>

      <div className="paw-dashboard__stats" style={{ display: 'block', marginTop: '32px' }}>
        <div className="paw-dashboard__stat-card" style={{ maxWidth: '100%' }}>
          <div className="paw-dashboard__stat-icon">
            <FaListAlt />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>No active listings</h4>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>You don't have any pets listed for adoption right now.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
