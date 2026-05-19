import React from 'react';
import { FaClipboardList } from 'react-icons/fa';

export default function RequestsPage() {
  return (
    <div className="paw-dashboard__content">
      <div className="paw-dashboard__welcome">
        <h1 className="paw-dashboard__welcome-title">My Requests</h1>
        <p className="paw-dashboard__welcome-subtitle">
          Manage your adoption requests and track their status.
        </p>
      </div>

      <div className="paw-dashboard__stats" style={{ display: 'block', marginTop: '32px' }}>
        <div className="paw-dashboard__stat-card" style={{ maxWidth: '100%' }}>
          <div className="paw-dashboard__stat-icon">
            <FaClipboardList />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>No requests yet</h4>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>You haven't made any adoption requests.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
