import '../styles/overview.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';


const Overview = () => {
  const userName = "Chairman"; 

  const data = [
    { name: 'Jan', contributions: 40000 },
    { name: 'Feb', contributions: 30000 },
    { name: 'Mar', contributions: 50000 },
    { name: 'Apr', contributions: 45000 },
    { name: 'May', contributions: 60000 },
  ];


  return (
    <div className="overview">

      {/* Welcome Section */}
      <div className="welcome-card">
        <h2>Welcome back, {userName} 👋</h2>
        <p>Here’s what’s happening in your chama today.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Members</h3>
          <p>120</p>
        </div>

        <div className="stat-card">
          <h3>Total Contributions</h3>
          <p>KES 350,000</p>
        </div>

        <div className="stat-card">
          <h3>Active Loans</h3>
          <p>18</p>
        </div>

        <div className="stat-card">
          <h3>Pending Payments</h3>
          <p>7</p>
        </div>
      </div>
       <div className="chart-card">
        <h3>Monthly Contributions</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="contributions" />
          </BarChart>
        </ResponsiveContainer>

      </div>


    </div>
  );
};

export default Overview;