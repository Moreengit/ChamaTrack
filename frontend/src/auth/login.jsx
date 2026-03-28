import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../styles/login.css'; // make sure this file exists

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '',  // email | phone number | chairman code
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
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Axios POST request
      const response = await axiosInstance.post('/auth/login', {
        identifier: formData.identifier.trim(),
        password: formData.password,
      });

      // Successful login
      const data = response.data;

      setSuccess('Login successful! Redirecting...');
      sessionStorage.setItem('user', JSON.stringify(data.data)); // save user info
      // If you generate a token in the backend:
      // sessionStorage.setItem('token', data.data.token);

      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1200);

    } catch (err) {
      console.error(err);
      // Axios errors come in err.response
      const errorMsg = err.response?.data?.error || 'Login failed. Check your credentials.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Login to Your Chama</h1>
          <p>Sign in to manage your chama, approve loans, and monitor contributions.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="identifier">Email / Phone Number / User ID</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter email, phone, or user ID"
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