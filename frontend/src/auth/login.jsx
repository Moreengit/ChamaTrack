import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // we'll create this next

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idNumber: '',       // chairman's ID number or national ID
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/auth/login', { // ← change to your real API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idNumber: formData.idNumber.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Check your ID and password.');
      }

      // Success → save token & redirect
      sessionStorage.setItem('token', data.token);           // or data.accessToken
      sessionStorage.setItem('user', JSON.stringify(data.user));

      setSuccess('Login successful! Redirecting...');

      // Redirect chairman to dashboard or chama management page
      setTimeout(() => {
        navigate('/dashboard'); // or '/chama-management' / '/chairman'
      }, 1200);

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>ChamaTrack Chairman Login</h1>
          <p>Sign in to manage your chama, approve loans, and monitor contributions.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="idNumber">User ID</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              placeholder="e.g. 12345678"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <div className="form-footer">
            <a href="/forgot-password" className="forgot-link">
              Forgot password?
            </a>
            <p>
              Not a chairman? <a href="/member-login">Login as member</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;