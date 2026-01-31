import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
      </div>
      <div className="card">
        <div className="form-group">
          <label className="form-label">Name</label>
          <p>{user?.name}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <p>{user?.email}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <p className="badge badge-primary">{user?.role}</p>
        </div>
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <p>{user?.companyName || 'N/A'}</p>
        </div>
        <div className="form-group">
          <label className="form-label">GSTIN</label>
          <p>{user?.gstin || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
