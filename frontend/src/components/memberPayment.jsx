import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { DollarSign, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/payment.css';

const MemberPayment = () => {
  const [formData, setFormData] = useState({
    amount: '',
    phoneNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 🔥 Autofill phone from logged-in user
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      setFormData(prev => ({
        ...prev,
        phoneNumber: user.phoneNumber || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');



    if (!formData.amount || !formData.phoneNumber) {
      return setError('All fields are required');
    }

    setLoading(true);

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const chamaId = user.chama_id;
      const res = await axiosInstance.post('/payments/stk', {
        amount: formData.amount,
        phoneNumber: formData.phoneNumber,
        chama_id: chamaId
      });

      console.log(res.data)

      setMessage('STK Push sent! Check your phone 📱');

      setFormData({
        amount: '',
        phoneNumber: formData.phoneNumber // keep phone
      });

    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="payment-widget">

    {/* HEADER */}
    <div className="widget-header">
      <div className="header-icon">
        <DollarSign size={20} />
      </div>
      <div>
        <h3>Make Contribution</h3>
        <p>Secure M-Pesa STK Push Payment</p>
      </div>
    </div>

    {/* CARD */}
    <div className="payment-card">

      {error && (
        <div className="alert error">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {message && (
        <div className="alert success">
          <CheckCircle size={16} />
          {message}
        </div>
      )}

      <form onSubmit={handlePayment}>

        {/* AMOUNT */}
        <div className="input-group">
          <label>
            <DollarSign size={15} />
            Contribution Amount
          </label>

          <div className="input-wrapper">
            <span>KES</span>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount e.g. 500"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* PHONE */}
        <div className="input-group">
          <label>
            <Phone size={15} />
            M-Pesa Phone Number
          </label>

          <div className="input-wrapper">
            <span>+254</span>
            <input
              type="text"
              placeholder="712 345 678"
              value={formData.phoneNumber?.replace('254', '')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: '254' + e.target.value.replace(/\s/g, '')
                })
              }
              required
            />
          </div>
        </div>

        {/* INFO NOTE */}
        <div className="payment-info">
          <p>📱 You’ll receive an M-Pesa prompt on your phone to complete payment.</p>
        </div>

        {/* BUTTON */}
        <button className="pay-btn" disabled={loading}>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              <Send size={16} />
              Pay Now
            </>
          )}
        </button>

      </form>
    </div>
  </div>
);
};

export default MemberPayment;