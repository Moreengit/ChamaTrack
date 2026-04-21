import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Upload, FileText, Download, Trash2, Calendar, Clock, File, X, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/minutes.css';

const Minutes = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    file: null
  });

  const [minutes, setMinutes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'title'

  // Fetch minutes
  const fetchMinutes = async () => {
    try {
      const res = await axiosInstance.get('/minutes');
      setMinutes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMinutes();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      const file = e.target.files[0];
      setFormData({ ...formData, file });
      setSelectedFile(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.date || !formData.file) {
      return setError('All fields are required');
    }

    setUploading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('date', formData.date);
    data.append('description', formData.description);
    data.append('file', formData.file);

    try {
      await axiosInstance.post('/minutes/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
        }
      });

      setSuccess('Minutes uploaded successfully');

      setFormData({
        title: '',
        date: '',
        description: '',
        file: null
      });
      setSelectedFile(null);

      fetchMinutes();

    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete these minutes?')) {
      try {
        await axiosInstance.delete(`/minutes/${id}`);
        setSuccess('Minutes deleted successfully');
        fetchMinutes();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete minutes');
      }
    }
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await axiosInstance.get(fileUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to download file');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileIcon = (fileName) => {
    const extension = fileName?.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📎';
    }
  };

  // Filter and sort minutes
  const filteredMinutes = minutes
    .filter(minute => 
      minute.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      minute.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return a.title?.localeCompare(b.title);
      }
    });

  return (
    <div className="minutes-page">
      {/* Header Section */}
      <div className="page-header">
        <h1>Meeting Minutes</h1>
        <p>Upload, manage, and access all your chama meeting minutes</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <FileText size={24} />
          <div>
            <h3>{minutes.length}</h3>
            <p>Total Minutes</p>
          </div>
        </div>
        <div className="stat-card">
          <Calendar size={24} />
          <div>
            <h3>{new Date().getFullYear()}</h3>
            <p>Current Year</p>
          </div>
        </div>
      </div>

      {/* TOP SECTION - Upload Form */}
      <div className="minutes-top">
        {/* LEFT INFO */}
        <div className="minutes-info">
          <div className="info-icon">
            <Upload size={48} strokeWidth={1.5} />
          </div>
          <h2>Upload New Minutes</h2>
          <p>
            Keep your chama organized by uploading meeting minutes. 
            All documents are securely stored and can be accessed by members anytime.
          </p>
          <div className="info-tips">
            <h4>Tips for better organization:</h4>
            <ul>
              <li>Use clear, descriptive titles</li>
              <li>Include meeting date for easy reference</li>
              <li>Add a brief description of key points</li>
              <li>Supported formats: PDF, DOC, DOCX, TXT</li>
            </ul>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="minutes-form" onSubmit={handleSubmit}>
          <h4 className="form-title">
            <File size={20} />
            Upload Minutes Document
          </h4>

          {error && (
            <div className="alert error">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          {success && (
            <div className="alert success">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Annual General Meeting - March 2024"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Meeting Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
              name="description"
              placeholder="Brief summary of key discussions and decisions..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group file-upload-area">
            <label>Upload File</label>
            <div className={`file-drop-zone ${selectedFile ? 'has-file' : ''}`}>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.txt"
                id="file-input"
                required
              />
              <label htmlFor="file-input" className="file-label">
                {selectedFile ? (
                  <>
                    <CheckCircle size={24} />
                    <span>{selectedFile.name}</span>
                    <small>{Math.round(selectedFile.size / 1024)} KB</small>
                  </>
                ) : (
                  <>
                    <Upload size={24} />
                    <span>Click or drag file to upload</span>
                    <small>PDF, DOC, DOCX, TXT (Max 10MB)</small>
                  </>
                )}
              </label>
            </div>
          </div>

          <button type="submit" disabled={uploading} className="upload-btn">
            {uploading ? (
              <>
                <div className="spinner"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Minutes
              </>
            )}
          </button>
        </form>
      </div>

      {/* MINUTES LIST SECTION */}
      <div className="minutes-section">
        <div className="minutes-header">
          <div className="header-left">
            <h3>
              <FileText size={20} />
              Uploaded Minutes
            </h3>
            <span className="count-badge">{filteredMinutes.length} files</span>
          </div>
          
          <div className="header-right">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <X size={16} onClick={() => setSearchTerm('')} className="clear-search" />
              )}
            </div>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date (Newest)</option>
              <option value="title">Sort by Title (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="minutes-list">
          {filteredMinutes.length === 0 ? (
            <div className="empty-state">
              {searchTerm ? (
                <>
                  <File size={48} strokeWidth={1.5} />
                  <p>No matching minutes found</p>
                  <small>Try a different search term</small>
                </>
              ) : (
                <>
                  <Upload size={48} strokeWidth={1.5} />
                  <p>No minutes uploaded yet</p>
                  <small>Upload your first meeting minutes using the form above</small>
                </>
              )}
            </div>
          ) : (
            filteredMinutes.map((item, index) => (
              <div key={item.id || item._id || index} className="minute-card">
                <div className="minute-left">
                  <div className="file-icon">
                    <span role="img" aria-label="file type">
                      {getFileIcon(item.file_name || item.title)}
                    </span>
                  </div>
                  <div className="minute-details">
                    <h4>{item.title}</h4>
                    {item.description && <p className="description">{item.description}</p>}
                    <div className="minute-meta">
                      <span className="meta-item">
                        <Calendar size={14} />
                        {formatDate(item.date)}
                      </span>
                      <span className="meta-item">
                        <Clock size={14} />
                        Added {new Date(item.created_at || item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="minute-actions">
                  <a 
                    href={item.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn view-btn"
                    title="View"
                  >
                    <FileText size={16} />
                    View
                  </a>
                  <button 
                    onClick={() => handleDownload(item.file_url, item.title)}
                    className="action-btn download-btn"
                    title="Download"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id || item._id)}
                    className="action-btn delete-btn"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Minutes;