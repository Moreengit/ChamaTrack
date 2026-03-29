import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import '../styles/addadmins.css';

const AddAdmins = () => {
  const [admins, setAdmins] = useState({
    secretary: { name: '', email: '', password: '', registered: false },
    treasurer: { name: '', email: '', password: '', registered: false }
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (role, field, value) => {
    setAdmins((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value
      }
    }));
  };

  const registerAdmin = async (role) => {
    const admin = admins[role];

    if (!admin.name || !admin.email || !admin.password) {
      setError(`Please fill all ${role} fields`);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axiosInstance.post('/admin/register', {
        name: admin.name,
        email: admin.email,
        password: admin.password,
        role
      });

      setMessage(res.data.message || `${role} registered successfully`);

      // update UI
      setAdmins((prev) => ({
        ...prev,
        [role]: {
          ...prev[role],
          registered: true
        }
      }));

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-admins-container">

      {/* STATUS */}
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {/* LEFT */}
      <div className="form-section">
        <div className="form-container">

          <h2>Admin Setup</h2>

          {/* Secretary */}
          <div className="admin-form-card">
            <h3>Secretary</h3>

            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => handleChange('secretary', 'name', e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange('secretary', 'email', e.target.value)}
            />

            <input
              type="password"
              placeholder="Set Password"
              onChange={(e) => handleChange('secretary', 'password', e.target.value)}
            />

            <button
              disabled={loading || admins.secretary.registered}
              onClick={() => registerAdmin('secretary')}
            >
              {loading ? 'Registering...' : 'Register Secretary'}
            </button>
          </div>

          {/* Treasurer */}
          <div className="admin-form-card">
            <h3>Treasurer</h3>

            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => handleChange('treasurer', 'name', e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange('treasurer', 'email', e.target.value)}
            />

            <input
              type="password"
              placeholder="Set Password"
              onChange={(e) => handleChange('treasurer', 'password', e.target.value)}
            />

            <button
              disabled={loading || admins.treasurer.registered}
              onClick={() => registerAdmin('treasurer')}
            >
              {loading ? 'Registering...' : 'Register Treasurer'}
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="preview-section">

        <h2>Admin Preview</h2>

        {/* Secretary */}
        <div className="preview-card">
          <h3>Secretary</h3>

          {admins.secretary.registered ? (
            <>
              <p><strong>Name:</strong> {admins.secretary.name}</p>
              <p><strong>Email:</strong> {admins.secretary.email}</p>
              <span className="badge success">Registered ✔</span>
            </>
          ) : (
            <p className="placeholder">Not registered</p>
          )}
        </div>

        {/* Treasurer */}
        <div className="preview-card">
          <h3>Treasurer</h3>

          {admins.treasurer.registered ? (
            <>
              <p><strong>Name:</strong> {admins.treasurer.name}</p>
              <p><strong>Email:</strong> {admins.treasurer.email}</p>
              <span className="badge success">Registered ✔</span>
            </>
          ) : (
            <p className="placeholder">Not registered</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddAdmins;