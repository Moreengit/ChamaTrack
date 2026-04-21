import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { DollarSign, Printer, TrendingUp } from 'lucide-react';
import '../styles/financialReport.css';

const FinancialReport = () => {
  const [report, setReport] = useState({
    totalContributions: 0,
    balance: 0,
    transactions: []
  });

  const fetchReport = async () => {
    try {
      const res = await axiosInstance.get('/payments/financial');
      setReport(res.data);
    } catch (err) {
      console.log(err);
      setReport({
        totalContributions: 0,
        balance: 0,
        transactions: []
      });
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-page">

      {/* HEADER */}
      <div className="report-header">
        <div>
          <h1>Financial Report</h1>
          <p>Contribution summary for your Chama</p>
        </div>

        <button onClick={handlePrint} className="print-btn">
          <Printer size={18} /> Print Report
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="report-cards">

        <div className="card">
          <DollarSign />
          <h3>KES {report.totalContributions.toLocaleString()}</h3>
          <p>Total Contributions</p>
        </div>

        <div className="card">
          <TrendingUp />
          <h3>KES {report.balance.toLocaleString()}</h3>
          <p>Available Balance</p>
        </div>

      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="report-table">

        <div className="table-header">
          <span>Member</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {report.transactions.length === 0 ? (
          <div className="empty-state">
            No financial records found
          </div>
        ) : (
          report.transactions.map((t) => (
            <div key={t.id} className="table-row">

              <span>{t.member_name}</span>

              <span className="amount">
                KES {t.amount}
              </span>

              <span className={`status ${t.status}`}>
                {t.status}
              </span>

              <span>
                {t.created_at
                  ? new Date(t.created_at).toLocaleDateString()
                  : '-'}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default FinancialReport;