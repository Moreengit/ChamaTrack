import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { DollarSign, Search, Calendar } from 'lucide-react';
import '../styles/contributions.css';

const ViewContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [search, setSearch] = useState('');

  const fetchContributions = async () => {
    try {
      const res = await axiosInstance.get('/payments/contributions');
      setContributions(res.data);
    } catch (err) {
      console.log(err);
      setContributions([]);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // 🔍 FILTER (fixed to backend field)
  const filtered = contributions.filter(c =>
    c.member_name?.toLowerCase().includes(search.toLowerCase())
  );

  // 💰 SAFE TOTAL CALCULATION
  const totalAmount = contributions.reduce(
    (sum, c) => sum + Number(c.amount || 0),
    0
  );

  return (
    <div className="contributions-page">

      {/* HEADER */}
      <div className="page-header">
        <h1>Contributions</h1>
        <p>Track all member payments in your Chama</p>
      </div>

      {/* SUMMARY CARD */}
      <div className="summary-card">
        <DollarSign size={24} />
        <div>
          <h3>KES {totalAmount.toLocaleString()}</h3>
          <p>Total Contributions</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE HEADER */}
      <div className="table-container">

        <div className="table-header">
          <span>Member</span>
          <span>Amount</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            No contributions found
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="table-row">

              {/* MEMBER */}
              <span>{item.member_name}</span>

              {/* AMOUNT */}
              <span className="amount">
                KES {item.amount}
              </span>

              {/* DATE */}
              <span className="date">
                <Calendar size={14} />
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString()
                  : '-'}
              </span>

              {/* STATUS */}
              <span className={`status ${item.status}`}>
                {item.status}
              </span>

            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ViewContributions;