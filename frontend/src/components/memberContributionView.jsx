import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import '../styles/contributions.css';

const MemberContributions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContributions = async () => {
    try {
      const res = await axiosInstance.get('/payments/my-contributions');
      setData(res.data);
    } catch (err) {
      console.error("Error fetching contributions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  // 🔢 Calculate total (only successful)
  const total = data
    .filter(item => item.status === 'success')
    .reduce((sum, item) => sum + Number(item.amount), 0);

  if (loading) return <p>Loading contributions...</p>;

  return (
    <div className="contributions-page">
      
      {/* 🔥 SUMMARY CARD */}
      <div className="summary-card">
        <h3>Total Contributions</h3>
        <h1>KES {total}</h1>
      </div>

      {/* 📊 TABLE */}
      <div className="table-container">
        <h2>My Contributions</h2>

        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4">No contributions yet</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>KES {item.amount}</td>

                  <td>
                    <span className={`status ${item.status}`}>
                      {item.status}
                    </span>
                  </td>

                  <td>{item.transaction_id || '-'}</td>

                  <td>
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberContributions;