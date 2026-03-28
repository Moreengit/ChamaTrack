import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import '../styles/addadmins.css';

const AddAdmins = () => {

  const [admins, setAdmins] = useState({
    secretary: { name: '', email: '', password: '', registered: false },
    treasurer: { name: '', email: '', password: '', registered: false }
  });
 const [message, setMessage] = useState('')
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState('')

  const handleChange = (role, field, value) => {
    setAdmins({
      ...admins,
      [role]: {
        ...admins[role],
        [field]: value
      }
    });
  };

  const registerAdmin = async (role) => {
  const admin = admins[role];

  if (!admin.name || !admin.email || !admin.password) {
    alert(`Complete all ${role} fields`);
    return;
  }

  setMessage('')
  setError('')
  try {
    const res = await axiosInstance.post('/admins/register', {
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: role  
    });

    setMessage(res.data.message || 'admin registered successfully');

    // update UI only AFTER success
    setAdmins({
      ...admins,
      [role]: {
        ...admin,
        registered: true
      }
    });

    alert(`${role} registered successfully`);

  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Something went wrong");

  }
};
  return (
    <div className="add-admins-container">

      {/* LEFT: FORM */}
      <div className="form-section">

  <div className="form-container">   {/* 👈 NEW WRAPPER */}

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

      <button onClick={() => registerAdmin('secretary')}>
        Register Secretary
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

      <button onClick={() => registerAdmin('treasurer')}>
        Register Treasurer
      </button>
    </div>

  </div>

</div>
      {/* RIGHT: PREVIEW */}
      <div className="preview-section">

        <h2>Admin Preview</h2>

        {/* Secretary Preview */}
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

        {/* Treasurer Preview */}
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