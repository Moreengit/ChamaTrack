import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Eye, EyeOff, UserPlus, Users, Mail, Phone, Lock, User, Trash2, Edit } from 'lucide-react';
import '../styles/registerMember.css';

const RegisterMember = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [members, setMembers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch members
  const fetchMembers = async () => {
    try {
      const res = await axiosInstance.get('/members');
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      return setError('All fields are required');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      if (isEditing && editId) {
        // Update existing member
        await axiosInstance.put(`/members/${editId}`, {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password
        });
        setSuccess('Member updated successfully');
        setIsEditing(false);
        setEditId(null);
      } else {
        // Register new member
        await axiosInstance.post('/members/register', {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password
        });
        setSuccess('Member registered successfully');
      }

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
      });

      fetchMembers(); // Refresh list

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name || '',
      email: member.email,
      phoneNumber: member.phonenumber || member.phoneNumber,
      password: '',
    });
    setIsEditing(true);
    setEditId(member.id || member._id);
    setShowPassword(false);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await axiosInstance.delete(`/members/${id}`);
        setSuccess('Member deleted successfully');
        fetchMembers();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete member');
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
    });
    setError('');
  };

  return (
    <div className="register-page">
      {/* Header Section */}
      <div className="page-header">
        <h1>Member Management</h1>
        <p>Manage your chama members efficiently</p>
      </div>

      {/* TOP SECTION - Registration/Edit Form */}
      <div className="register-top">
        {/* LEFT TEXT */}
        <div className="register-info">
          <div className="info-icon">
            <UserPlus size={48} strokeWidth={1.5} />
          </div>
          <h2>{isEditing ? 'Edit Member' : 'Register New Members'}</h2>
          <p>
            {isEditing 
              ? 'Update member information. Ensure all details are correct before saving.'
              : 'Add new members to your chama easily. Ensure their name, email, and phone number are correct for smooth communication and contribution tracking.'
            }
          </p>
          <div className="info-stats">
            <div className="stat">
              <Users size={20} />
              <span>{members.length} Total Members</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <div className="form-group">
            <label>
              <User size={16} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. member@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Phone size={16} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="0712 345 678"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={16} />
              Password
            </label>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required={!isEditing}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </span>
            </div>
            {isEditing && (
              <small className="field-hint">Leave blank to keep current password</small>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {isEditing ? 'Update Member' : 'Register Member'}
            </button>
            {isEditing && (
              <button type="button" className="btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* BOTTOM SECTION - MEMBERS LIST */}
      <div className="members-section">
        <div className="members-header">
          <h3>
            <Users size={20} />
            Registered Members
          </h3>
          <div className="member-count">{members.length} members</div>
        </div>

        <div className="members-table">
          <div className="table-header">
            <span>Name</span>
            <span>Email</span>
            <span>Phone Number</span>
            <span>Actions</span>
          </div>

          {members.length === 0 ? (
            <div className="empty-state">
              <Users size={48} strokeWidth={1.5} />
              <p>No members registered yet</p>
              <small>Add your first member using the form above</small>
            </div>
          ) : (
            members.map((member, index) => (
              <div key={member.id || member._id || index} className="table-row">
                <span className="member-name">
                  <User size={14} />
                  {member.name || 'No name provided'}
                </span>
                <span className="member-email">{member.email}</span>
                <span className="member-phone">{member.phonenumber || member.phoneNumber}</span>
                <span className="member-actions">
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEdit(member)}
                    title="Edit member"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(member.id || member._id)}
                    title="Delete member"
                  >
                    <Trash2 size={16} />
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterMember;