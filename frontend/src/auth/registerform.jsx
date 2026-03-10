// src/pages/RegisterFrom.jsx   ← your file name
import { useState } from 'react';
import '../styles/registerform.css';   // make sure this path is correct

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    chairmanName: '',
    email: '',
    phonenumber: '',
    chamaName: '',
    frequency: '',
    description: '',
    password: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting chama data:', formData);
    alert('Chama registration submitted! (Demo — connect backend later)');
    // Later: send to API, show success message, redirect to dashboard...
  };

  return (
    <div className="register-form-page">
      <div className="container">
        <div className="form-header">
          <h1>Create Your Chama</h1>
          <p>
            Fill in your chama details below. You can add members and adjust settings after creation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="chama-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label>Chairman Name *</label>
                <input
                  type="text"
                  name="chamaName"
                  value={formData.chairmanName}
                  onChange={handleChange}
                  placeholder="e.g. Tumaini Chama ya Akiba"
                  required
                />
              </div>

              <div className="form-group" >
                <label> Email:</label>
                <input
                 type="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="moreen@gmail.com"
                 required
                />
              </div>
              <div className="form-group">
                <label> Phone Number:</label>
                <input
                 type="text"
                 name="phonenumber"
                 value={formData.phonenumber}
                 onChange={handleChange}
                 placeholder="07xxxxxxxx"
                 required
                />
              </div>

              

              <div className="form-group">
                <label>Contribution Frequency *</label>
                <select name="frequency" value={formData.frequency} onChange={handleChange} required>
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Chama Name</label>
                <input
                  type="text"
                  name="chamaname"
                  value={formData.chamaName}
                  onChange={handleChange}
                  placeholder="womens association group"
                  required
                />
              </div>

              <div className="form-group">
                <label>Short Description (optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Briefly describe your chama (purpose, members, goals...)"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type='password'
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-checkbox">
            <label>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
              />
              I agree to the <a href="/terms">Terms of Service</a> and{' '}
              <a href="/privacy">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="submit-chama-btn">
            Create Chama
          </button>
        </form>

        <p className="form-note">
          After creation you’ll be able to invite members, set up M-Pesa paybill (optional), and enable SMS notifications.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;