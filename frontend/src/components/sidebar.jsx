import React, { useState } from 'react';
import { 
  Home, Users, UserPlus, DollarSign, HandCoins, BarChart3, ChevronDown, ChevronRight 
} from 'lucide-react';
import Overview from './overview';
import AddAdmins from './addAdmins';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [active, setActive] = useState("Home");
  const [reportsOpen, setReportsOpen] = useState(false);

  const render = () => {
    switch(active){
      case 'Home':
        return <Overview />;
      case 'Members':
        return <h2>Members Page</h2>;
      case 'Add Member':
        return <AddAdmins />
      case 'Contributions':
        return <h2>Contributions Page</h2>;
      case 'Loans':
        return <h2>Loans Page</h2>;
      case 'Loan Reports':
        return <h2>Loan Reports</h2>;
      case 'Contribution Reports':
        return <h2>Contribution Reports</h2>;
      default:
        return <h2>Working on the app...</h2>;
    }
  };

  return (
    <div className="side-bar">
      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <h2>ChamaTrack</h2>
          <p>Admin Panel</p>
        </div>

        <div className="panel">

          <button
            onClick={() => setActive('Home')}
            className={`menu-btn ${active === 'Home' ? 'active' : ''}`}
          >
            <Home size={20}/>
            <span>Home</span>
          </button>

          <button
            onClick={() => setActive('Members')}
            className={`menu-btn ${active === 'Members' ? 'active' : ''}`}
          >
            <Users size={20}/>
            <span>Members</span>
          </button>

          <button
            onClick={() => setActive('Add Member')}
            className={`menu-btn ${active === 'Add Member' ? 'active' : ''}`}
          >
            <UserPlus size={20}/>
            <span>Add Member</span>
          </button>

          <button
            onClick={() => setActive('Contributions')}
            className={`menu-btn ${active === 'Contributions' ? 'active' : ''}`}
          >
            <DollarSign size={20}/>
            <span>Contributions</span>
          </button>

          <button
            onClick={() => setActive('Loans')}
            className={`menu-btn ${active === 'Loans' ? 'active' : ''}`}
          >
            <HandCoins size={20}/>
            <span>Loans</span>
          </button>

          {/* Reports Dropdown */}
          <div className="menu-btn" onClick={() => setReportsOpen(!reportsOpen)}>
            <BarChart3 size={20}/>
            <span>Reports</span>
            {reportsOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
          </div>

          {reportsOpen && (
            <div className="submenu">
              <div 
                onClick={() => setActive('Loan Reports')}
                className="submenu-item"
              >
                Loan Reports
              </div>

              <div 
                onClick={() => setActive('Contribution Reports')}
                className="submenu-item"
              >
                Contribution Reports
              </div>
            </div>
          )}

        </div>
     
      </aside>

      {/* Main Content */}
      <main className="main-render">
        {render()}
      </main>
    </div>
  );
};

export default Sidebar;