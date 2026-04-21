import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import '../styles/receipt.css';

const ReceiptPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await axiosInstance.get('/payments/my-receipts');
        setReceipts(res.data);
      } catch (err) {
        console.error("Error fetching receipts:", err);
        setReceipts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  if (loading) {
    return (
      <div className="receipt-wrapper">
        <p>Loading payment proofs...</p>
      </div>
    );
  }

  if (!receipts.length) {
    return (
      <div className="receipt-wrapper">
        <p>No payments found</p>
      </div>
    );
  }

  return (
    <div className="receipt-wrapper">
    <div className="receipt-grid-container">
      <h2 className="page-title">Recent Transactions</h2>
        {receipts.map((r) => (
          <div key={r.id} className="receipt-card">
            <div className="receipt-header">
              <h3>{r.chama_name}</h3>
              <p className="receipt-subtitle">Official Payment Receipt</p>
            </div>

            <div className="amount-section">
              <span className="currency">KES</span>
              <span className="amount">{Number(r.amount).toLocaleString()}</span>
            </div>

            <div className="receipt-details">
              <div className="detail-row">
                <span className="label">Member</span>
                <span className="value">{r.member_name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status</span>
                <span className={`status-badge ${r.status.toLowerCase()}`}>
                  {r.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Transaction ID</span>
                <span className="value-mono">{r.transaction_id || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date</span>
                <span className="value">
                  {new Date(r.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            <div className="receipt-actions">
              <button className="print-btn" onClick={() => window.print()}>
                Download PDF / Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptPage;