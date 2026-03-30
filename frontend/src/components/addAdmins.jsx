import { useState, useEffect } from 'react';
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
  const [showSecretaryPassword, setShowSecretaryPassword] = useState(false);
  const [showTreasurerPassword, setShowTreasurerPassword] = useState(false);

  // ✅ FETCH EXISTING ADMINS
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get('/admin/display');

      const data = res.data;

      const updatedAdmins = {
        secretary: { ...admins.secretary },
        treasurer: { ...admins.treasurer }
      };

      data.forEach((admin) => {
        if (admin.role === 'secretary') {
          updatedAdmins.secretary = {
            name: admin.name,
            email: admin.email,
            registered: true
          };
        }

        if (admin.role === 'treasurer') {
          updatedAdmins.treasurer = {
            name: admin.name,
            email: admin.email,
            registered: true
          };
        }
      });

      setAdmins(updatedAdmins);

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (role, field, value) => {
    setAdmins((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [field]: value
      }
    }));
  };

  // ✅ SINGLE REGISTER FUNCTION
  const registerAdmins = async () => {
    const { secretary, treasurer } = admins;

    if (!secretary.name || !secretary.email || !secretary.password ||
        !treasurer.name || !treasurer.email || !treasurer.password) {
      setError('Fill all fields for both admins');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const payload = [
  {
    role: 'secretary',
    name: secretary.name,
    email: secretary.email,
    password: secretary.password
  },
  {
    role: 'treasurer',
    name: treasurer.name,
    email: treasurer.email,
    password: treasurer.password
  }
];

      const res = await axiosInstance.post('/admin/register', {
        admins: payload
    });

      setMessage(res.data.message || 'Admins registered successfully');

      fetchAdmins(); // refresh UI

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ CONDITION: hide form if both registered
  const bothRegistered =
    admins.secretary.registered && admins.treasurer.registered;

  return (
    <div className="add-admins-container">

      {/* LEFT */}
      {!bothRegistered && (
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

              <div className="password-container">
                <input
                  type={showSecretaryPassword ? "text" : "password"}
                  placeholder="Set Password"
                  onChange={(e) => handleChange('secretary', 'password', e.target.value)}
                />

                <span
                  className="eye-icon"
                  onClick={() => setShowSecretaryPassword(!showSecretaryPassword)}
                >
                  {showSecretaryPassword ? '🙈' : '👁️'}
                </span>
              </div>
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

              <div className="password-container">
                <input
                  type={showTreasurerPassword ? "text" : "password"}
                  placeholder="Set Password"
                  onChange={(e) => handleChange('treasurer', 'password', e.target.value)}
                />

                <span
                  className="eye-icon"
                  onClick={() => setShowTreasurerPassword(!showTreasurerPassword)}
                >
                  {showTreasurerPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            {/* ✅ ONE BUTTON */}
            <button onClick={registerAdmins} disabled={loading}>
              {loading ? 'Registering...' : 'Register Admins'}
            </button>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}

      {/* RIGHT PREVIEW */}
      <div className="preview-section">
        <h2>Admin Preview</h2>

        <div className="preview-card">
          <h3>Secretary</h3>
          {admins.secretary.registered ? (
            <>
              <p><strong>Name:</strong> {admins.secretary.name}</p>
              <p><strong>Email:</strong> {admins.secretary.email}</p>
            </>
          ) : <p>Not registered</p>}
        </div>

        <div className="preview-card">
          <h3>Treasurer</h3>
          {admins.treasurer.registered ? (
            <>
              <p><strong>Name:</strong> {admins.treasurer.name}</p>
              <p><strong>Email:</strong> {admins.treasurer.email}</p>
            </>
          ) : <p>Not registered</p>}
        </div>
      </div>
    </div>
  );
};

export default AddAdmins;