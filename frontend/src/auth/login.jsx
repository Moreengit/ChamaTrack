import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Clean & simple input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axiosInstance.post('/auth/login', {
        identifier: formData.identifier.trim(),
        password: formData.password.trim(),
      });

      const data = res.data?.data;

      if (!data?.token) {
        throw new Error('Invalid server response');
      }

      // Store auth data
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          chairmanId: data.chairmanId,
          chairmanCode: data.chairmanCode,
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
        })
      );

      setSuccess('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    } catch (err) {
      console.error('Login error:', err);

      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid credentials. Please try again.';

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
          <p>Manage contributions, members, and loans easily.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          {/* Identifier Field */}
          <div className="form-group">
            <label htmlFor="identifier">Email / Phone / User ID</label>
            <input
              id="identifier"
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter email, phone, or ID"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group password-box">
            <label htmlFor="password">Password</label>

            <div className="password-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          {/* Messages */}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          {/* Footer Links */}
          <div className="form-footer">
            <a href="/forgot-password">Forgot password?</a>
            <p>
              Not a chairman?{' '}
              <a href="/member-login">Login as member</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;