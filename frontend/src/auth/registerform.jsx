import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, Link} from 'react-router-dom';
import '../styles/registerform.css';

const RegisterForm = () => {
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [success, setSuccess] = useState('');


  const checkPasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 8) return 'Too short (min 8 characters)';
    if (!/[A-Z]/.test(password)) return 'Add at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Add at least one lowercase letter';
    if (!/\d/.test(password)) return 'Add at least one number';
    if (!/[@$!%*?&]/.test(password)) return 'Add at least one special character (@$!%*?&)';
    return 'Strong password ✅';
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError(''); // clear error on change
    if (name === 'password') {
    const strengthMsg = checkPasswordStrength(value);
    setPasswordStrength(strengthMsg);
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.chairmanName.trim() || !formData.email.trim() || !formData.phonenumber.trim()) {
      setError('Please fill in all required chairman details');
      return;
    }
    if (!formData.chamaName.trim()) {
      setError('Chama name is required');
      return;
    }
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// if (!formData.password || !passwordStrengthRegex.test(formData.password)) {
//   setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character');
//   return;
// }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and privacy policy');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        chairmanName: formData.chairmanName.trim(),
        email: formData.email.trim(),
        phonenumber: formData.phonenumber.trim(),
        chamaName: formData.chamaName.trim(),
        frequency: formData.frequency,
        description: formData.description.trim(),
        password: formData.password,
      };

      
      const response = await axiosInstance.post(
        '/auth/registerchama', //backend API endpoint
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Success handling
      setSuccess('Chama registration successful! Redirecting to dashboard...');
      
      // Optional: save token/user data
      if (response.data.token) {
        sessionStorage.setItem('token', response.data.token);
      }

      // Redirect after short delay (gives time to see success message)
      setTimeout(() => {
        navigate('/login'); // or '/my-chama' or wherever chairman goes after login
      }, 1800);

    } catch (err) {
      console.error('Registration error:', err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please check your details and try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-form-page">
      <div className="container">
        <div className="form-header">
          <h1>Create Your Chama</h1>
          <p>
            Fill in your details to register as chairman and create your chama on ChamaTrack.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="chama-form">
          

          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label>Chairman Name *</label>
                <input
                  type="text"
                  name="chairmanName"
                  value={formData.chairmanName}
                  onChange={handleChange}
                  placeholder="e.g. Moreen Kiruri"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="moreen@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  placeholder="07xxxxxxxx"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contribution Frequency *</label>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Chama Name *</label>
                <input
                  type="text"
                  name="chamaName"
                  value={formData.chamaName}
                  onChange={handleChange}
                  placeholder="e.g. Tumaini Womens Group"
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
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                />
                {passwordStrength && (
                  <small
                    style={{
                    color: passwordStrength.includes('Strong') ? 'green' : 'orange',
                    display: 'block',
                    marginTop: '5px',
                   }}
                  >
                    {passwordStrength}
                  </small>
                )}
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

          <button
            type="submit"
            className="submit-chama-btn"
            disabled={loading}
          >
            {loading ? 'Creating Chama...' : 'Create Chama'}
          </button>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <p className="cta-footer">
            Already have an account? <Link to="/login">Log in to your dashboard</Link>
          </p>

        </form>
        
        <p className="form-note">
          After creation you’ll be able to invite members, set up M-Pesa paybill (optional), and enable SMS notifications.
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;