import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

export default function AddPetPage() {
  return (
    <div className="paw-dashboard__content">
      <div className="paw-dashboard__welcome">
        <h1 className="paw-dashboard__welcome-title">Add a Pet</h1>
        <p className="paw-dashboard__welcome-subtitle">
          List a new pet for adoption and help them find a loving home.
        </p>
      </div>

      <div className="paw-dashboard__stats" style={{ display: 'block', marginTop: '32px' }}>
        <div className="paw-dashboard__stat-card" style={{ maxWidth: '100%' }}>
          <div className="paw-dashboard__stat-icon">
            <FaPlusCircle />
          </div>
          <div className="paw-dashboard__stat-info">
            <h4>Coming Soon</h4>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>The add pet form is under construction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
